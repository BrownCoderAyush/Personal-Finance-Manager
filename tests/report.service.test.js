const ReportService = require("../src/services/report.service");

jest.mock('../src/services/report.service');


describe("ReportService", () => {

    let reportService;

    beforeAll(() => {
        reportService = new ReportService();
    });

    it('should fetch the report for monthly basis', async () => {

        const input = {
            month: 7,
            year: 2024,
            userId : 10
        }
        const output = {
            travel: {
                "expense": 0,
                "income": 10000
            },
            Party: {
                "expense": 0,
                "income": 10000
            },
            netsaving: 20000
        }
    

        reportService.createMonthlyReport.mockResolvedValue(output);

        const reportResult = await reportService.createMonthlyReport(input.month,input.year,input.userId);

        expect(reportResult).toBeDefined();
        expect(reportResult.travel).toBeDefined();
        expect(reportResult.Party).toBeDefined();
        expect(reportResult.netsaving).toBe(output.netsaving);
    });


})