const db = require("../models");

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Handbook.create({
                    title: data.name,
                    image: data.imageBase64,
                    contentHTML: data.descriptionHTML,
                    contentMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}


let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }

            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllHandbookVer2 = (limit, pageNumber) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!limit || !pageNumber) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required param!'
                })
            }
            else {
                let fake = []

                fake = await db.Handbook.findAll({
                    attributes: ['id']
                })


                let orderByType = ['updatedAt', 'DESC'];
                const offset = (pageNumber - 1) * limit;

                let data = await db.Handbook.findAll({
                    order: [['id', 'ASC']],
                    limit: +limit,
                    offset: offset,
                });
                if (data && data.length > 0) {
                    data.map(item => {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                        return item;
                    })
                }

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data,
                    maxDataNumber: fake.length
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}

let getDetailHandbookById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['contentHTML', 'contentMarkdown', 'id', 'title', 'image']
                })

                if (!data) {
                    data = {};
                } else {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById,
    getAllHandbookVer2: getAllHandbookVer2
}