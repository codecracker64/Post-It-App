import jwt from 'jsonwebtoken';

const auth = async(req,res, next) => {
    try{
        console.log("middleware req:", req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'secret');
            console.log("decodedData:",decodedData);
            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);
            console.log("decodedData:",decodedData);
            req.userId = decodedData?.sub;
        }

        next();
    }
    catch(error){
        console.log(error);
    }
}

export default auth;