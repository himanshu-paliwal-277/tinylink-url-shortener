export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newDoc = await model.create(data);
      return newDoc;
    },
    getAll: async function () {
      const allDocs = await model.find();
      return allDocs;
    },
    getAllPaginated: async function ({ page = 1, limit = 10, search = '' }) {
      const skip = (page - 1) * limit;

      // Build search query
      const searchQuery = search
        ? {
            $or: [
              { code: { $regex: search, $options: 'i' } },
              { targetUrl: { $regex: search, $options: 'i' } },
            ],
          }
        : {};

      // Get total count and paginated results
      const [total, docs] = await Promise.all([
        model.countDocuments(searchQuery),
        model.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ]);

      return {
        data: docs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },
    getById: async function (id) {
      const doc = await model.findById(id);
      return doc;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    update: async function (id, data) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedDoc;
    },
  };
}
