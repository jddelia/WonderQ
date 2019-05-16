const consumer = {
  process: async (db, item) => {
    let start = new Date().getTime();
    let job = item;
    console.log(job.messageId);

    const procItem = await db.findOneAndUpdate({ messageId: job.messageId }, { active: true });
    //console.log(item)
    console.log(`Item ${item.messageId} processing`);

    const processTime = new Date().getTime();
    const artificalTime = new Date().getTime() + 20000;

    // Add times to array, and randomly select
    // to simulate processing times/error
    let endTime = [processTime, artificalTime][Math.floor(Math.random()*2)];


    if (endTime > start + 10000) {
      const restoredItem = await db.findOneAndUpdate({ messageId: job.messageId }, { active: false })
      console.log(`Item ${item.messageId} restored`);
      return item;
    } else {
      const deletedItem = await db.findByIdAndRemove({ _id: item._id});
      console.log(`Item ${item.messageId} deleted`);
    }
  }
}

module.exports = consumer;