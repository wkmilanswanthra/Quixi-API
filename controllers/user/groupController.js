const mongoose = require("mongoose");
const groupService = require("../../services/user/groupService");
const userService = require("../../services/user/userService");

exports.createGroup = async (req, res) => {
    if (!req.body)
        return res.status(400).send({message: "Request body is required"});

    try {
        const token = req.headers.authorization.split(" ")[1];
        const newGroup = await groupService.createGroup(req.body, token);
        res.status(201).send(newGroup);
    } catch (e) {
        res
            .status(500)
            .send({message: e.message || "There was an error creating the group"});
    }
};

exports.find = async (req, res) => {
    try {
        let group;
        if (req.query.id) {
            group = await groupService.findByGroupId(req.query.id);
        } else {
            group = await groupService.fetchAllGroups();
        }
        if (!group) {
            return res.status(404).json({
                message: "Group not found",
            });
        }
        res.status(200).json({group});
    } catch (e) {
        res.status(500).json({message: e.message || "Server Error"});
    }
};

exports.findGroupByUserID = async (req, res) => {
    try {
        let userId = req.params.user;
        const groups = await groupService.findGroupByUserId(userId);
        res.status(200).json({groups});
    } catch (e) {
        res.status(500).json({message: e.message || "Server Error"});
    }
};

exports.updateGroupById = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).send({
                message: "The body cannot be empty to update group data",
            });
        console.log(req.body);
        // if (req.body.members)
        //   req.body.members = JSON.parse(req.body.members).map(
        //     (id) => new mongoose.Types.ObjectId(id)
        //   );
        const id = req.params.id;
        req.body.updatedOn = new Date();
        const group = await groupService.updateGroupById(id, req.body);
        if (!group) return res.status(404).json({message: "Group not found"});
        res.status(200).send({group});
    } catch (e) {
        console.log(e);
        res.status(500).send({message: e.message || "Error when updating group"});
    }
};

exports.deleteByGroupId = async (req, res) => {
    try {
        const id = req.params.id;
        const group = await groupService.deleteGroupById(id);
        res.status(200).send({message: "Group was deleted successfully"});
    } catch (e) {
        res.status(500).send({message: e.message || "Error when deleting group"});
    }
};
