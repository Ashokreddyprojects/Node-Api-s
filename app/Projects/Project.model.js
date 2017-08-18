var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var ProjectData = {
    Name: { type: String },
    Email: { type: String },
    Phone: { type: Number },
    Address: { type: String },
    City: { type: String },
    State: { type: String },
    ZipCode: { type: Number },
    ProjectName: { type: String },
    OrganizationName: { type: String },
    PropertyAddress: { type: String },
    MetroArea: { type: String },
    ConstructionType: { type: String },
    PurchasePrice: { type: Number },
    SquareFootage: { type: Number },
    RenovationLevel: { type: String },
    Studios: { type: String },
    One_BeaRoom_11: { type: Number },
    Two_BeaRoom_12: { type: Number },
    Three_BeaRoom_13: { type: Number },
    Four_BeaRoom_14: { type: Number },
    createdDate: { type: Date, default: Date.now }
};

var projectSchema = mongoose.Schema(ProjectData);
mongoose.model("ProjectList", projectSchema);