const { performance } = require('perf_hooks')
const puppeteer = require('puppeteer')

const PERF_EVENTS = ['domcontentloaded', 'load']

async function handler () {
  try {
    const browser = await launchPuppeteer()
    const page = await browser.newPage()

    try {
      markPageEventsForPerformance(page)
      performance.mark('start')

      await page.goto(process.env.WEBSITE_URL)
      await page.waitFor(process.env.WAIT_FOR_SELECTOR)

      performance.mark('end')

      const performanceMeasurements = getPerformanceMeasurements()

      await emitSuccessMetric({ performanceMeasurements })

      const screenshotBase64 = await page.screenshot({
        fullPage: true,
        encoding: 'base64'
      })

      return {
        performanceMeasurements,
        screenshotBase64
      }
    } catch (error) {
      await emitFailMetric()
      const reason = 'Failed running test'
      
      console.error(stringify({
        reason,
        error: error.stack
      }))
      
      return Promise.reject(reason)
    }
  } catch (error) {
    const reason = 'Unknown'
    
    console.error(stringify({
      reason,
      error: error.stack
    }))
    
    return Promise.reject(reason)
  }
}

function getPerformanceMeasurements () {
  const performanceMeasurements = {}

  performance.getEntriesByType('mark')
  .filter(perfMeasurement => perfMeasurement.name !== 'start')
  .forEach(perfMeasurement => {
    performance.measure(perfMeasurement.name, 'start', perfMeasurement.name)
    const measurement = performance.getEntriesByName(perfMeasurement.name, 'measure')[0]
    performanceMeasurements[perfMeasurement.name] = measurement.duration
  })

  return performanceMeasurements
}

const stringify = v => JSON.stringify(v)

function launchPuppeteer () {
  const executablePath = process.env.CHROME_EXECUTABLE_PATH ? process.env.CHROME_EXECUTABLE_PATH : '/opt/chromium_headless_shell'
  
  return puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-gpu', '--single-process']
  })
}

function markPageEventsForPerformance(page) {
  PERF_EVENTS.forEach(perfEvent => {
    page.once(perfEvent, () => {
      performance.mark(perfEvent)
    })
  })
}

function emitSuccessMetric({ performanceMeasurements } = {}) {
  // TODO: Emit success metric
}

function emitFailMetric() {
  // TODO: Emit fail metric
}

module.exports.handler = handler