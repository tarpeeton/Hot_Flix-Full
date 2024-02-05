const { SuccessCallback, ErrorCallback } = require("./callback");
const path = require("path");
const fs = require("fs");
const { modelName } = require("../model/year");


module.exports = class MyClass {
    constructor(MODEL, REQUEST, RESPONSE, NEXT) {
        this.ModelSchema = MODEL
        this.request = REQUEST
        this.response = RESPONSE
        this.next = NEXT
    }


    // Malumot yaratish
    async createData() {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;
        try {
            const body = { ...req.body }
            const result = new MODEL(body)
            await result.save()
            SuccessCallback(body, req, res, next)
        }
        catch (error) {
            ErrorCallback(error.message, req, res, next)
        }
    }

    
    // Hamma malumotni olish
    async getDatas(count, ...populates) {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;

        const total = await MODEL.find().countDocuments()

        const { pages } = req.query
        const skip = parseInt((pages - 1) * count)
        if (!skip || skip == "" || skip == undefined || skip == 1) {
            await MODEL
                .find()
                .populate([...populates])
                .sort({ createdAt: -1 })
                .limit(count)
                .lean()
                .exec((error, data) => {
                    if (error) ErrorCallback(error.message, req, res, next)
                    else {
                        res.json({
                            success: true,
                            count: count,
                            total: total,
                            data: data,
                        })
                    }
                })
        }
        else {
            await MODEL
                .find()
                .populate([...populates])
                .sort({ createdAt: -1 })
                .limit(count)
                .skip(skip)
                .exec((error, data) => {
                    if (error) ErrorCallback(error.message, req, res, next)
                    else {
                        res.json({
                            success: true,
                            count: count,
                            total: total,
                            data: data,
                        })
                    }
                })
        }
    }
    async getDatasWithoutPagination(...populates) {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;
        await MODEL.find().populate([...populates]).sort({ createdAt: -1 }).lean().exec((error, data) => {
            if (error) ErrorCallback(error.message, req, res, next)
            else {
                if (data == "" || data == []) ErrorCallback("Ma'lumot topilmadi", req, res, next)
                else SuccessCallback(data, req, res, next)
            }
        })
    }
    // Alohida ma'lumotni olish - 1 
    async getData(...populates) {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;
        const { id } = req.params;
        await MODEL.findById({ _id: id }).populate([...populates]).exec((error, data) => {
            if (error) ErrorCallback(error.message, req, res, next)
            else {
                if (data == null) ErrorCallback("Ma'lumot topilmadi. Oldin o'chirib yuborilgan", req, res, next)
                else SuccessCallback(data, req, res, next)
            }
        })
    }
    // Alohida ma'lumotni olish - 2
    async getSingleData(...populates) {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;
        const { id } = req.params;
        await MODEL.findById({ _id: id }).populate([...populates]).exec((error, data) => {
            if (error) ErrorCallback(error.message, req, res, next)
            else {
                if (data == null) ErrorCallback("Ma'lumot topilmadi. Oldin o'chirib yuborilgan", req, res, next)
                else SuccessCallback(data, req, res, next)
            }
        })
    }


    // Alohida rasm ishtirok etmagan holatda tahrirlash
    async updateSingleDataWithoutFile() {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;
        const { id } = req.params;

        await MODEL.findByIdAndUpdate({ _id: id }).exec(async (error, data) => {
            if (error) ErrorCallback(error.message, req, res, next)
            else {
                if (data == null) ErrorCallback("Ma'lumot topilmadi. Oldin o'chirib yuborilgan", req, res, next)
                else {
                    Object.assign(data, req.body)
                    await data.save()
                        .then(() => {
                            SuccessCallback(data, req, res, next)
                        })
                        .catch((error) => {
                            ErrorCallback(error.message, req, res, next)
                        })
                }
            }
        })
    }
    // Alohida rasm ishtirok etmagan holatda o'chirish
    async deleteSingleDataWithoutFile() {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;
        const { id } = req.params;

        await MODEL.findByIdAndDelete({ _id: id }).exec(async (error, data) => {
            if (error) ErrorCallback(error.message, req, res, next)
            else {
                if (data == null) ErrorCallback("Ma'lumot topilmadi. Oldin o'chirib yuborilgan", req, res, next)
                else SuccessCallback([], req, res, next)
            }
        })
    }

    // Alohida rasm ishtirok etgan holatda tahrirlash
    async updateSingleDataWithFile(key, folder) {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;
        const { id } = req.params;

        await MODEL.findById({ _id: id })
            .exec(async (error, data) => {
                if (error) ErrorCallback(error.message, req, res, next)
                else {
                    const files = data[key]
                    for (let item of files) {
                        const filePath = path.join(__dirname, `../public/${folder}/` + item)
                        fs.unlink(filePath, function () { [] })
                    }
                }
            })
        await MODEL.findByIdAndUpdate({ _id: id })
            .exec(async (error, data) => {
                if (error) ErrorCallback(error.message, req, res, next)
                else {
                    const files = req.files
                    const arrayFiles = []
                    for (let item of files) {
                        const { filename } = item
                        arrayFiles.push(filename)
                    }
                    data[key] = arrayFiles
                    await data.save()
                        .then(() => SuccessCallback(data, req, res, next))
                        .catch((error) => ErrorCallback(error.message, req, res, next))
                }
            })
    }

    // Alohida rasm ishtirok etgan holatda o'chirish
    async deleteSingleDataWithFile(key, folder) {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;
        const { id } = req.params;

        await MODEL.findById({ _id: id })
            .exec(async (error, data) => {
                if (error) ErrorCallback(error.message, req, res, next)
                else {
                    const files = data[key]
                    for (let item of files) {
                        const filePath = path.join(__dirname, `../public/${folder}/` + item)
                        fs.unlink(filePath, function (error) { })
                    }
                    await MODEL.findByIdAndDelete({ _id: id })
                    SuccessCallback([], req, res, next)
                }
            })
    }
    // Hamma malumotni olish
    async filterData(method, count, ...populates) {
        const MODEL = this.ModelSchema
        const req = this.request
        const res = this.response
        const next = this.next;

        const total = await MODEL.find(method).countDocuments()

        const { pages } = req.query
        const skip = parseInt((pages - 1) * count)
        if (!skip || skip == "" || skip == undefined || skip == 1) {
            await MODEL
                .find(method)
                .populate([...populates])
                .sort({ createdAt: -1 })
                .limit(count)
                .lean()
                .exec((error, data) => {
                    if (error) ErrorCallback(error.message, req, res, next)
                    else {
                        res.json({
                            success: true,
                            count: count,
                            total: total,
                            data: data,
                        })
                    }
                })
        }
        else {
            await MODEL
                .find(method)
                .populate([...populates])
                .sort({ createdAt: -1 })
                .limit(count)
                .skip(skip)
                .exec((error, data) => {
                    if (error) ErrorCallback(error.message, req, res, next)
                    else {
                        res.json({
                            success: true,
                            count: count,
                            total: total,
                            data: data,
                        })
                    }
                })
        }
    }
}


