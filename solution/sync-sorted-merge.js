"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const mergedlogEntries = [];
  logSources.forEach((logSource) => {
    let logEntry = logSource.pop();
    while (logEntry !== false) {
      mergedlogEntries.push(logEntry);
      logEntry = logSource.pop();
    }
  });

  // Sort the results by date
  mergedlogEntries.sort(
    (logA, logB) => new Date(logA.date) - new Date(logB.date)
  );

  // Print the sorted results
  mergedlogEntries.forEach((logEntry) => printer.print(logEntry));
  printer.done();
  return console.log("Sync sort complete.");
};
