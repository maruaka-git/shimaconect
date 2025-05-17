const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt');
const fileUpload = require("express-fileupload");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {jwtDecode} = require('jwt-decode');
const exp = require("constants");
const fs = require('fs');

const app = express();
const port = 3000;
const prisma = new PrismaClient();


app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use('/uploadIcon',express.static(__dirname+ '/uploadIcon'));
app.use('/uploadImage', express.static(__dirname + '/uploadImage'));
app.use('/uploadVideo', express.static(__dirname + '/uploadVideo'));
dotenv.config();

function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: '2h' });
}

app.post("/user-posts",async(req,res)=>{
  try{
    const decoded = jwtDecode(req.body.token);
    const posts = await prisma.handsign.findMany({
      where:{
        userId:decoded.id,
      },
    })
    res.send(posts);
  }catch{
    res.send(null);
  }
})

app.post("/user",async(req,res)=>{
  try{
    const decoded = jwtDecode(req.body.token);
    const user = await prisma.user.findUnique({
      where:{
        id: decoded.id,
      }
    })
    console.log(user);
    res.send(user);
  }catch(err){
    res.send(null);
  }
})

app.get("/",(req,res)=>{
  const pattern = "_[r,l,b]\.npz";
  const videoFile = "シマエナガ_ryusei011413131313_ryusei114414141511414_r.npz"
  let regex = (videoFile).match(pattern);
  console.log(regex);
})
app.get("/api",(req,res)=>{
  res.send("api接続できました");
})

app.get("/delete",(req,res)=>{
  res.send("delte接続できました");
})

app.post("/delete-user",async(req,res)=>{
  const decoded = jwtDecode(req.body.token);
  const posts = await prisma.handsign.findMany({
    where:{
      userId:decoded.id,
    }
  })
  try{
    if(posts){
      posts.map((post)=>{
        console.log(post.image);
        let filePath = __dirname+"\\uploadImage\\"+post.image;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('File deleted successfully');
        });

        filePath = __dirname+"\\uploadVideo\\"+post.video;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('File deleted successfully');
        });
      })
    }
  }catch(err){
    console.error(err);
  }
  await prisma.handsign.deleteMany({
    where:{
      userId:decoded.id,
    },
  })
  const deleteUser = await prisma.user.delete({
    where: {
      id: decoded.id,
    },
  })
})

app.get("/allUser",async (req,res)=>{
  const list = await prisma.user.findMany({

  })
  res.send(list);
})

app.get('/forum-new',async(req,res)=>{
  const list = await prisma.handsign.findMany({
    orderBy:{
      time: 'desc'
    },
  });
  res.send(list);
})

app.get('/forum-popu',async(req,res)=>{
  const list = await prisma.handsign.findMany({
    orderBy:{
      fav: 'desc'
    },
  });
  res.send(list);
})

app.post("/fav",async(req,res)=>{
  console.log(req.body);
  try{
    await prisma.handsign.update({
      where:{
        postid: req.body.postid,
      },
      data:{
        fav: req.body.fav,
      },
    })
  }catch(error){
    res.send(false);
  }
})


app.post('/hand', async (req, res) => {
  try {
    const now =Date.now()
    
    const decoded = jwtDecode(req.body.token);
   
    //写真（サムネイル）投稿
    const imageFile = req.files.handSignImage;
    let file_type_image = req.files.handSignImage.name.split('.').pop();
    const uploadPathImage = __dirname+"\\uploadImage\\"+decoded.id.replace(/_/g, '')+now+"."+file_type_image;
    
    // ファイルを保存
    
    await imageFile.mv(uploadPathImage, function(err){
      if (err) {
        return res.status(500).send(err);
      }
    });
    
    //
    const pattern = "_[r,l,b]\.npz$";
    const videoFile = req.files.handSignVideo;
    console.log(req.files.handSignVideo);
    let regex = (req.files.handSignVideo.name).match(pattern);
    let file_type_video = regex;
    const uploadPathVideo = __dirname+"\\uploadVideo\\"+req.body.handSignName+"_"+decoded.id.replace(/_/g, '')+now+file_type_video;
    console.log(uploadPathVideo);
    // ファイルを保存
    await videoFile.mv(uploadPathVideo, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
    const cat = req.body.category.split(" ");
    console.log(decoded.id,":",req.body);
    await prisma.handsign.create({
      data:{
        userId: decoded.id,
        title: req.body.handSignName,
        category: cat[0],
        categorySub: cat[1],
        body: req.body.detail,
        hashtag1: req.body.hashTag1,
        hashtag2: req.body.hashTag2,
        hashtag3: req.body.hashTag3,
        hashtag4: req.body.hashTag4,
        image:  decoded.id.replace(/_/g, '')+now+"."+file_type_image,
        video: req.body.handSignName+"_"+decoded.id.replace(/_/g, '')+now+file_type_video,
        fav: 0
      }
    });
  }catch(err){
    console.log("出来ません")
    res.status(500).send(err);
  }
  
});

app.post("/sign-up-valid", async (req, res) => {
  const { name, id, gender,password, passwordConfirm } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (user) {
      // ユーザーが見つかった場合
      return res.json({ valid: false, message: "このIDは既に使用されています" });
    } else {
      // ユーザーが見つからなかった場合
      return res.json({ valid: true, message: "このIDは使用されていません" });;
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/sign-up", async (req, res) => {
  const { name, id, gender, password ,passwordConfirm} = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: "このIDは既に使用されています" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name,
        id: id,
        gender: gender,
        password: hashedPassword,
      }
    });
    const token = generateAccessToken({ id: req.body.id });
    return res.json({
      "valid":true,
      "message":"せいこうしたよ！",
      "token":token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/login",async(req,res) => {
  try{
    const { id, password} = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });
    const compare = await bcrypt.compare(password,user.password);
    if(compare){
      let time = Date.now();
      let today = Date(time);
      console.log(today);
      console.log("ログイン成功: "+user.id+"\n"+today);
      const token = generateAccessToken({ id: req.body.id });
      return(res.json({
        "valid":true,
        "message":"せいこうしたよ！",
        "token":token
      }))
    }else{
      return(res.json({
        "valid": false,
        "message":"やりなおせ！！",
        "token":null
      }))
    }
  }catch(error){
    console.error(error);
    return res.json({
      "valid": false,
      "message": "サーバーエラーが発生しました"
    });
  }
})

app.post('/jwt', async (req, res) => {
  try {
    console.log(req.body.token);
    const decoded = jwtDecode(req.body.token);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });
    if(user){
      res.json(true);
    }else{
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.json(false);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});