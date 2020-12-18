const Job = require("./models/job")
const faker = require("faker");

async function seeds(){
    await Job.remove({});
    let i = 0;
    for (i=0;i<600;i++){
       const random={
          "title" :faker.name.jobTitle(),
          "description": faker.name.jobDescriptor(),
          "jobType":faker.name.jobType(),
          "address":faker.address.streetAddress({useFullAddress:true}),
          "skills":[faker.name.jobArea(),faker.name.jobArea(),faker.name.jobArea(),faker.name.jobArea(),faker.name.jobArea()],
          "startDate":faker.date.recent(),
          "endDate":faker.date.future(),
          "category":faker.name.jobType(),
          "vacancies":faker.random.number({min:1,max:2000}),
          "shift":"Day",
          "city":faker.address.city()

           }

        const job = new Job(random);
        await job.save();
    }
    console.log("600 jobs created")
}
module.exports = seeds;