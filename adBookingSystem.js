class Stream {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  consume(min, max) {
    const amount = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`${this.name} consumed ${amount} units.`);
    } else {
      console.log(
        `${this.name} cannot consume ${amount} units. Insufficient balance.`
      );
    }
  }
  // rebalance
  rebalanceTo(equalBalance) {
    const diff = Math.abs(this.balance - equalBalance);
    if (this.balance < equalBalance) {
      this.balance += diff;
      console.log(`${this.name} rebalanced by adding ${diff} units.`);
    } else if (this.balance > equalBalance) {
      this.balance -= diff;
      console.log(`${this.name} rebalanced by subtracting ${diff} units.`);
    }
  }
}

class StreamManager {
  constructor(stream1, stream2) {
    this.stream1 = stream1;
    this.stream2 = stream2;
  }
  //check balance.
  checkBalance() {
    const totalBalance = this.stream1.balance + this.stream2.balance;
    this.percentStream1 = (this.stream1.balance / totalBalance) * 100;
    this.percentStream2 = (this.stream2.balance / totalBalance) * 100;
  }
  //stream get consumed by certain amount.
  run() {
    while (true) {
      const minConsume = 2000;
      const maxConsume = 5000;
      if (this.stream1.balance <= 0 || this.stream2.balance <=0) {
        console.log("Both streams have no balance.");
        break;
      }
      this.stream1.consume(minConsume, maxConsume);
      this.stream2.consume(minConsume, maxConsume);

      this.checkBalance();
      //If the both streams has balance 0%.
      if (this.percentStream1 <= 0 && this.percentStream2 <= 0) {
        console.log("Both streams have no balance.");
        break;
      }
      // If both streams have balance 5% or less than that then re-balance it.
      else if (this.percentStream1 < 5 || this.percentStream2 < 5) {
        const equalBalance = Math.max(
          this.stream1.balance,
          this.stream2.balance
        );
        this.stream1.rebalanceTo(equalBalance);
        this.stream2.rebalanceTo(equalBalance);
        console.log("Rebalanced streams to have equal balance.");
      } else {
        //No action if doesn't fall under those threee categories.
        console.log("No rebalancing needed.");
      }
    }
  }
}
module.exports = { Stream, StreamManager };
