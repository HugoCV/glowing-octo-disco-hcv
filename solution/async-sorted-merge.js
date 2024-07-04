"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const resultLogEntries = [];
    // Function to process each logSource
    async function processSource(source) {
      let entry = await source.popAsync();
      while (entry) {
        resultLogEntries.push(entry);
        entry = await source.popAsync();
      }
    }

    try {
      // Create an array of promises to process each source and collect their log entries
      const processingPromises = logSources.map((source) =>
        processSource(source)
      );

      // Wait for all sources to be processed and gather the results
      await Promise.all(processingPromises);

      // Sort the results by date
      resultLogEntries.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Print the sorted results
      resultLogEntries.forEach((logEntry) => printer.print(logEntry));

      printer.done();

      resolve(console.log("Async sort complete."));
    } catch (error) {
      // Reject the promise if there's an error
      reject(error);
    }
  });
};
