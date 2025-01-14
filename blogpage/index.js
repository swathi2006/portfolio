const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");
uuidv4();

app.use(express.urlencoded({extended:true}));//parsing
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
const port=2006;

let blogs=[
    {
        id:uuidv4(),
        src:"https://kalaguragampa.com/media/catalog/product/cache/bde31e1ff3b3df1c640a56baa1663e87/S/o/Soapnut-1.jpg",
        theme:"hair care",
        content_index:"natural shampoo",
        text:"As I think it is important to make the shampoo with a concentration of saponins (the cleansing ingredient in soap nuts) as high as possible, I cant say, this amount of soap nuts with this amount of water. Instead, I applied a layer of soap nuts to the bottom of the pan. The amount you use will depend on the size of your pan. The larger the pan, the more soap nuts you will use. This is ok as long as you have a bottle that is big enough to store your soap nut shampoo in later Add a single layer of soap nuts to a pan 2. Add water to the pan until all the soap nuts are covered with water. 3. Let the soap nut boil for 10 minutes  4. The liquid starts to smell like soap nuts have a very distinct odor and the water should turn brownish.5. After 10 minutes of boiling, the soap nuts should be soft. Squash the soap nuts with a tool to get more saponins out of the soap nuts. Be careful as the liquid is very hot. 6. Let the soap nuts boil for another 5 minutes.7. Squash the soap nuts one more time after 5 minutes8. Let the mixture coo9. Weigh the mixing bowl (write down the weight!)10. Place the sieve in the mixing bowl 11. Pour the soap nut mixture through the sieve 12. Give the soap nut mixture a squish to release as much of the liquid as possible. 13. Weigh the soap nut liquid with the mixing bowl  14. Deduct the weight of the mixing bowl. You now know how much liquid you have 15. Add your preservative according to the instructions of your preservative of choice 16. Put the liquid in a bottle of choice.17. Enjoy"   
    },

    {
        id:uuidv4(),
        src:"https://static-bebeautiful-in.unileverservices.com/benefits-of-rice-water-for-skin_3_0.jpg",
        theme:"skin care",
        content_index:"ricewater",
        text:"There are several different ways to prepare rice water. They all require thorough rinsing of the rice before working with it. Most say that the type of rice you use doesn’t matter. Boiling rice water Rinse the rice thoroughly and drain. Use about four times more water than rice. Stir the rice and water together and bring to a boil. Remove it from the heat. Take a spoon and press the rice to release the helpful chemicals, strain out the rice with a sieve, and refrigerate the water in an airtight container for up to a week. Dilute with plain water before using. Soaking rice water You can also make rice water by soaking rice in water. Follow the same process as above, but instead of boiling the rice and water, let it soak for at least 30 minutes before pressing the rice and straining it through the sieve. Finally, refrigerate the rice water.Fermented rice water To make fermented rice water, use the same process for soaking the rice. Then, instead of refrigerating the water (after pressing and straining out the rice), leave it in a jar at room temperature for one or two days. When the container starts to have a sour smell, put it in the refrigerator. Dilute with plain water before using."
        
    },

    {
        id:uuidv4(),
        src:"https://south.one/wp-content/uploads/2023/12/michung.jpg",
        theme:" some dangerous cyclones",
        content_index:"Michhuang cyclone",
        text:"two days after facing the fury of Cyclone Michaung, many parts of Chennai continued to reel under severe flooding, water-logging, and power outage. To assess the flood situation in the state, Defence Minister Rajnath Singh will visit Tamil Nadu on Thursday. He is also scheduled to hold a meeting with Chief Minister MK Stalin. "
    },
]

app.get("/blog",(req,res)=>{
    res.render("index.ejs",{blogs});
});


app.get("/blog/new",(req,res)=>{
    res.render("new.ejs");
 });
 
app.post("/blog",(req,res)=>{ //post request to posts (here posts is another page ,because of post request this will become different posts)
    let {src,theme,content_index,text} = req.body;
    let id= uuidv4();
    blogs.push({id,src,theme,content_index,text});
    res.redirect("/blog");//get request to posts
});//app.post should be at first that means above than show.ejs

app.get("/blog/:id",(req,res)=>{
    let {id}=req.params;
    let blog =blogs.find((b)=>id===b.id);
    res.render("show.ejs",{blog})
    
});

app.get("/blog/:id/edit",(req,res)=>{
    let {id}=req.params;
    let blog=blogs.find((b)=>id===b.id);
    res.render("edit.ejs",{blog});
    
});

app.patch("/blog/:id",(req,res)=>{
    let {id}=req.params;
   let newContent=req.body.text;

   let blog = blogs.find((b)=>id===b.id);
   blog.text=newContent;
  res.redirect("/blog");
   

});

app.delete(("/blog/:id"),(req,res)=>{
    let {id}=req.params;
    blogs = blogs.filter((b)=>id!==b.id);//we filter all posts which ids are not equal to selected id and then we add all filtered posts to posts array, except same id post//we store those filetred data in the same old variable name
   res.redirect("/blog");
});






 
app.listen(port,(req,res)=>{
    console.log("listening on port 2006");
})