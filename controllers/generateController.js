
const { GoogleGenerativeAI } = require("@google/generative-ai");

const getGenerateController = async(req,res,next) =>{
    try {
        const {title} = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Write a comprehensive blog post about ${title}, including a detailed explanation of the key concepts, practical examples, and actionable steps for readers to implement,Ensure a conversational tone, addressing potential concerns and incorporating relevant data or expert opinions to establish credibility.sample structure : {title,summary,content[{subheading,content},{subheading,content}]}(you can give multiple subheading and description and total section name is content) return the result that can easily convert into javascript object using json.parse : {title,summary,content[{subheading,content},{subheading,content}]}`;
        const result = await model.generateContent(prompt);
        if(!result){
            return res.status(400).json({ message: "something went wrong!"})
        }
        const message = result.response.text();
        let newStr = message.replace('```json',"");
        let str = newStr.replace('```',"");
        const data = JSON.parse(str);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getGenerateController,
}