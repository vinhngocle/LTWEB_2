var db = require('../utils/db');
module.exports = {
    all : ()=>{
        return db.load('select * from baiviet');
    },
    add : entity => {
        return db.add('baiviet', entity);
    }
};

//thêm post mới
module.exports.addPost = function (newPost, callback) {
    newPost.save(callback);
}

//Lấy post mới nhất
module.exports.getRecentPost = function (date) {
    return new Promise((resolve, reject) => {
        post.find({ "NgayDang": { $lte: date }, "TinhTrang": true }, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        }).sort({ NgayDang: -1 }).limit(10);
    })

}
//lấy post nhiều view nhất
module.exports.getMostViewsPost = function (date) {
    return new Promise((resolve, reject) => {
        post.find({ "NgayDang": { $lte: date }, "TinhTrang": true }, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        }).sort({ LuotXem: -1 }).limit(10);
    })
}
//đếm số lượng views
module.exports.updateViews = function(id){
    return new Promise((resolve,reject)=>{
        post.findByIdAndUpdate(id,{$set:{LuotXem: LuotXem + 1}},(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        })
    })
}
//Tìm bài viết theo id
module.exports.SingleID = function(id){
    return new Promise((resolve,reject)=>{
        post.findById(id,(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        })
    })
}
//load theo categories cho dashboard
module.exports.findCategories = function(date, catName){
    return new Promise((resolve,reject)=>{
        post.find({"NgayDang": { $lte: date },"ChuyenMuc": catName, "TinhTrang": true},(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        }).limit(2).sort({ NgayDang: -1 });
    })
}
//Load all categories
module.exports.findAllCategories = function(date, catName, start_offset){
    return new Promise((resolve,reject)=>{
        post.find({"NgayDang": { $lte: date },"ChuyenMuc": catName, "TinhTrang": true},(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        }).sort({ NgayDang: -1 }).limit(6).skip(start_offset);
    })
}
//Count all categories
module.exports.countCat = function(date, catName){
    return new Promise((resolve,reject)=>{
        post.count ({"NgayDang": { $lte: date },"ChuyenMuc": catName, "TinhTrang": true},(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        })
    })
} 
//
module.exports.findAllWithTagName = function(date, tagName, start_offset){
    return new Promise((resolve,reject)=>{
        post.find({"NgayDang": { $lte: date },"Nhan": tagName, "TinhTrang": true},(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        }).sort({ ngayDang: -1 }).limit(6).skip(start_offset);
    })
}
//
module.exports.countTag = function(date, tagName){
    return new Promise((resolve,reject)=>{
        post.count ({"NgayDang": { $lte: date },"Nhan": tagName, "TinhTrang": true},(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        })
    })
}
//
module.exports.GetPostByUser = function(idUser){
    return new Promise((resolve,reject)=>{
        post.find({idAuther: idUser},(err,docs)=>{
            if(err) reject(err);
            if(docs) resolve(docs);
        })
    })
}
module.exports.countGetPostByUser = function(idUser){
    return new Promise((resolve,reject)=>{
        post.count({idAuther: idUser},(err,total)=>{
            if(err) reject(err);
            if(total) resolve(total);
        })
    })
}
module.exports.getAllNotApproved = ()=>{
    return new Promise((resolve,reject)=>{
        post.find({duyet: false},(err,docs)=>{
            if(err) reject(err);
            if(docs) resolve(docs);
        })
    })
}
module.exports.countGetNotApproved = ()=>{
    return new Promise((resolve,reject)=>{
        post.count({duyet: false},(err,docs)=>{
            if(err) reject(err);
            if(docs) resolve(docs);
        })
    })
}
module.exports.getAllByCatName = (catName)=>{
    return new Promise((resolve,reject)=>{
        post.find({chuyenMuc: catName},(err,docs)=>{
            if(err) reject(err);
            if(docs) resolve(docs);
        })
    })
}
module.exports.countGetAllByCatName = (catName)=>{
    return new Promise((resolve,reject)=>{
        post.count({chuyenMuc: catName},(err,docs)=>{
            if(err) reject(err);
            if(docs) resolve(docs);
        })
    })
}

module.exports.approvedPost = (id)=>{
    return new Promise((resolve,reject)=>{
        post.findByIdAndUpdate(id,{$set:{"TinhTrang": true}},(err,docs)=>{
            if(err) reject(err);
            if(docs) resolve(docs);
        })
    })
}