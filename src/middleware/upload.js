import multiparty from 'multiparty'

export default async function defineUploadMiddleware(req, res, next) {
    const cloudinary = req.app.get('cloudinary')
    const form = new multiparty.Form();

    let filePath

    form.parse(req, async (err, fields, files) => {
        Object.values(files).forEach(file => {
            filePath = file[0].path
        })

        const file = await cloudinary.uploader.upload(filePath)
        res.locals.file = file
        next()
    });
}
