const { Stream, StreamManager } = require("./adBookingSystem");

describe("Stream and StreamManager Tests", () => {
  test("Check initial balance equality", () => {
    const stream1 = new Stream("Stream 1", 50000);
    const stream2 = new Stream("Stream 2", 50000);
    const streamManager = new StreamManager(stream1, stream2);
    expect(stream1.balance).toEqual(stream2.balance);
  });

  test("Test stream consumption within valid range", () => {
    const stream = new Stream("Stream", 50000);
    stream.consume(2000, 5000);
    console.log(stream.balance);
    expect(stream.balance).toBeGreaterThanOrEqual(45000);
    expect(stream.balance).toBeLessThanOrEqual(48000);
  });

  test("Test stream consumption with insufficient balance", () => {
    const stream = new Stream("Stream", 50000);
    const initialBalance = stream.balance;
    stream.consume(55000, 60000);
    expect(stream.balance).toEqual(initialBalance);
  });

  /*
  This will run the infinite loop.
  */
  test("Test stream rebalancing", () => {
    const stream1 = new Stream("Stream 1", 10000);
    const stream2 = new Stream("Stream 2", 30000);
    const streamManager = new StreamManager(stream1, stream2);
    streamManager.run();
    expect(stream1.balance).not.toEqual(stream2.balance);
  });

  test("Test program exit when both streams have zero balance", () => {
    const stream1 = new Stream("Stream 1", 0);
    const stream2 = new Stream("Stream 2", 0);
    const streamManager = new StreamManager(stream1, stream2);
    streamManager.run();
    expect(stream1.balance).toEqual(0);
    expect(stream2.balance).toEqual(0);
  });
});
