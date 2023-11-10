import { v2 as cloudinary } from "cloudinary";

import {
  formModel,
  categorizeModel,
  clozeModel,
  comprehensionModel,
} from "../models/index.js";

export const getAllForms = async (req, res) => {
  try {
    const PAGE_SIZE = parseInt(req.query?.page_size || "10");
    const PAGE_NO = parseInt(req.query?.page_no - 1 || "0");

    let obj = {};

    const [total, forms] = await Promise.all([
      formModel.countDocuments(obj),
      formModel
        .find(obj)
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * PAGE_NO)
        .sort("-createdAt")
        .lean(),
    ]);

    res.status(200).json({
      data: forms,
      total_data: total,
      total_pages: Math.ceil(total / PAGE_SIZE),
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Something went wrong, Retry!" });
  }
};

export const getFormById = async (req, res) => {
  try {
    const formId = req.params.formId;

    const [formData, categorizeQues, clozeQues, comprehensionQues] =
      await Promise.all([
        formModel.findById(formId).lean(),
        categorizeModel.find({ form: formId }).lean(),
        clozeModel.find({ form: formId }).lean(),
        comprehensionModel.find({ form: formId }).lean(),
      ]);

    res.status(200).json({
      data: {
        ...formData,
        questions: [...categorizeQues, ...clozeQues, ...comprehensionQues],
      },
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Something went wrong, Retry!" });
  }
};

export const postForm = async (req, res) => {
  try {
    const formId = req.body.formId;

    req.body.headerImage = req.files?.headerImage?.shift()?.path || "";

    const questionsImagesObj = req.files?.questionsImages?.reduce(
      (prev, curr) => {
        const id = curr.filename.replace(`forms/${formId}-`, "");
        return { ...prev, [id]: curr.path };
      },
      {}
    );

    const newForm = await formModel.create({ ...req.body });

    if (req.body.questions) {
      const questions = JSON.parse(req.body.questions);
      await Promise.all([
        ...questions.map(async (question, index) => {
          const questionObj = {
            ...question,
            form: newForm.id,
            imageUrl: questionsImagesObj[index.toString()] || "",
          };

          return question.type === "categorize"
            ? await categorizeModel.create(questionObj)
            : question.type === "cloze"
            ? await clozeModel.create(questionObj)
            : await comprehensionModel.create(questionObj);
        }),
      ]);
    }

    res.status(200).json({ message: "Form creation successful!" });
  } catch (error) {
    console.error("error", error);
    if (req.files.headerImage)
      await cloudinary.uploader.destroy(req.files.headerImage[0].path);
    if (req.files.questionsImages)
      req.files.questionsImages.map(
        async (img) => await cloudinary.uploader.destroy(img.path)
      );
    res.status(500).json({ message: "Something went wrong, Retry!" });
  }
};

// regex to get public id  from url "/upload\/(?:v\d+\/)?([^\.]+)/"
