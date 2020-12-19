

function escapeRegExp(str) {
     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
module.exports = {
    errorHandler: (fn) => (req, res, next)=>Promise.resolve(fn(req,res,next)).catch(next),   
    async SearchFilter(req,res,next){
     
        const query = Object.keys(req.query);
        console.log(query);

        // Check if query has length that is user submited a search or filter form 
        if(query.length)
        {
          const dbquery = [];
                /* Search logic
                    search,jobtype=[fulltime,internship,parttime],minsalary,company,startDate
                    search by company    /company/:companyid
                    location will implement later on 
                */
          let {search,jobType,category,salary,startDate} = req.query;
             if(search)
             {
                search = new RegExp(escapeRegExp(search), 'gi');
                dbquery.push({
                    $or:[
                        {title:search},
                        {description:search}
                    ]
                })

             }

             if(jobType)
             {    
                 console.log(jobType)
                 dbquery.push({jobType:{$in:jobType}});
             }
             if(category)
             {
                 dbquery.push({category});
             }
             if(salary)
             {
                 dbquery.push({salary:{gte:salary}})
             }
             if(startDate)
             {   
                //  make sure it is a data
                //  dbquery.push({startDate:{gte:new Date(startDate)}})
             }
             res.locals.dbquery = dbquery.length ? { $and: dbquery } : {};

        }

        /* To maintain the state of the search and filter form pass the req.query as a local variable
           local variabl exists till the response is not sent 
           once the request-response cycle is completed it gets destroyed

        */
       res.locals.query = req.query;
       query.splice(query.indexOf('page'), 1);
       const delimiter = query.length ? '&' : '?';
       res.locals.paginateUrl = req.originalUrl.replace(/(\?|\&)page=\d+/g, '') + `${delimiter}page=`;
       next();
    },
    isFormfilled(req,res,next)
    {
        if(req.user.formFilled!=5)
        {
            // return res.render(`page${req.user.formFilled+1}`); // this is wrong method as at the same route page will be rendered
            
            return res.redirect(`/user/edit?page=${req.user.formFilled+1}`)
            
        }
        next();
    }
}