import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: String,
    },
    checked: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

let Dataset = mongoose.models.blogs || mongoose.model('blogs', blogSchema)
export default Dataset