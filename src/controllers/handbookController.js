import handbookService from "../services/handbookService";
import HandbookService from "../services/handbookService";

let createHandbook = async (req, res) => {
    try {
        let infor = await HandbookService.createHandbook(req.body);
        return res.status(200).json(
            infor
        )
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllHandbook = async (req, res) => {
    try {
        let infor = await handbookService.getAllHandbook();
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailHandbookById = async (req, res) => {
    try {
        let infor = await handbookService.getDetailHandbookById(req.query.id, req.query.location);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}


module.exports = {
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById
}