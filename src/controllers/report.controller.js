const ReportService = require("../services/report.service");

const reportService = new ReportService();


const getReport = async (req, res,next) => {
    try {
        if(
            req.body.month == null ||
            req.body.year == null
        ){
            throw new Error("Required fields not present");
        }

        const report = await reportService.createMonthlyReport(req.body.month,req.body.year,req.user.id);

        return res.status(201).json({
            data: report,
            success: true,
            message: "Successfully generated a report",
            status : 0
        });
    } catch (error) {
       next(error);
    }
}




module.exports = {
    getReport
}