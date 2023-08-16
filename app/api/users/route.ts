import connectDB from '../../connections/db.connection';
import  User  from '../../models/users.Model';
import { NextRequest , NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {action} = reqBody;
    if(action === "login"){
      return login(reqBody);
    }
    if(action === "register"){
      return register(reqBody);
    }
   
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// login

async function login(reqBody:any){
  try {
    const {username , password } = reqBody;
    if(!username || !password){
      return NextResponse.json(
        { message: "Please provide username and password" },
        { status: 400 }
      );
    }
    // check if user exists

    const isUser = await User.findOne({username});
    if(!isUser){
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }
    // // check if password is correct
    // const isPasswordCorrect = await bcrypt.compare(password , isUser.password);
    // console.log(isPasswordCorrect);
    // if(!isPasswordCorrect){
    //   return NextResponse.json(
    //     { message: "Invalid credentials" },
    //     { status: 400 }
    //   );
    // }
    // create token data
    const tokenData = {
      id: isUser._id,
      username: isUser.username,
      email: isUser.email,
    };

    // create token
    const token = await jwt.sign(tokenData , 'jokhendra' , {expiresIn: "1d"});

    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
      isUser,
    });
    response.cookies.set("token" , token , {
      httpOnly: true,
    });
    return response;
    
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// register

async function register(reqBody:any){
  const {username , password ,email } = reqBody;
  if(!username || !password || !email){
    return NextResponse.json(
      { message: "Please provide username and password" },
      { status: 400 }
    );
  }
  // check if user exists

  const isUser = await User.findOne({username});
  if(isUser){
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password , salt);
  const newUser = new User({
    email,
    username,
    password: hashedPassword
  });
  const savedUser = await newUser.save();
  return NextResponse.json({
    message: "User registered successfully",
    success: true,
    savedUser,
  });
}