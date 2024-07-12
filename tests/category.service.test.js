const CategoryService = require("../src/services/category.service");

jest.mock('../src/services/category.service');


describe("CategoryService", () => {

    let categoryService;

    beforeAll(() => {
        categoryService = new CategoryService();
    });

    it('should create a new category', async () => {

        const input = {
            id: 10,
            type: "Party"
        }
        const output = {
            id: 1,
            userId: 10,
            type: "Party"
        }

        categoryService.createCategory.mockResolvedValue(output);

        const category = await categoryService.createCategory(input.id,input.type);

        expect(category).toBeDefined();
        expect(category.id).toBe(output.id);
        expect(category.type).toBe(output.type);
    });


})