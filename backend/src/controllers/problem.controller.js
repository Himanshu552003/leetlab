import { db } from "../libs/db.js";
import { pollBatchResults, getJudge0LanguageId, submitBatch } from "../libs/judge0.lib.js";


export const createProblem = async (req, res) => {


    // going to get the all the data from the request body
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;



    // going to check the user role once again
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "You are not allowed to create a problem" })

    }



    // loop through each reference solutions for different languages
    try {
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);

            if (!languageId) {
                return res.status(400).json({ error: `Language ${language} is not supported` })
            }

            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,

            }))

            const submissionResults = await submitBatch(submissions)

            const tokens = submissionResults.map((res) => res.token);

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];

                if (result.status.id !== 3) {
                    return res.status(400).json({ error: `Testcase ${i + 1} failed for language ${language}` });
                }
            }
        }

        // save the problem to the db
        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id,
            },

        });

        return res.status(201).json({
            sucess: true,
            message: "Message Created Successfully",
            problem: newProblem
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Creating Problem",
        });
    }
};


export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany(
      {
        include:{
          solvedBy:{
            where:{
              userId:req.user.id
            }
          }
        }
      }
    );

    if (!problems) {
      return res.status(404).json({
        error: "No problems Found",
      });
    }

    res.status(200).json({
      sucess: true,
      message: "Message Fetched Successfully",
      problems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Fetching Problems",
    });
  }
};

export const getProblemById = async (req, res) => {
    const { id } = req.params;

    try {
        const problem = await db.problem.findUnique({
            where: {
                id,

            },
        });

        if (!problem) {
            return res.status(404).json({ error: "Problem not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Message Created Successfully",
            problem,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errro: "Error While Fetching Problem by id",
        });

    };
}

export const updateProblem = async (req, res) => {
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body; 
    const {problemId}=req.params;

        // going to check the user role once again
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "You are not allowed to update a problem" })

    }

        try {

            const existingProblem=await db.problem.findUnique({
                where:{
                    id:problemId,
                }
            });

            if(!existingProblem){
                return res.status(404).json({error:"Problem not found"});
            }


        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);

            if (!languageId) {
                return res.status(400).json({ error: `Language ${language} is not supported` })
            }

            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,

            }));

            const submissionResults = await submitBatch(submissions)

            const tokens = submissionResults.map((res) => res.token);

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];

                if (result.status.id !== 3) {
                    return res.status(400).json({ error: `Testcase ${i + 1} failed for language ${language}` });
                }
            }
        }

        // save the problem to the db
        const updatedProblem = await db.problem.update({
            where:{id:problemId},
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id,
            },

        });

        return res.status(201).json({
            sucess: true,
            message: "Problem updated Successfully",
            problem: updatedProblem
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While updating problem",
        });
    }

};


export const deleteProblem = async (req, res) => {
    const { id } = req.params;

    try {
        const problem = await db.problem.findUnique({ where: { id } });

        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        await db.problem.delete({ where: { id } });

        res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error while deleting the problem",
        });

    }
};

export const getAllProblemsSolvedByUSer = async (req, res) => {
    try {
        const problems = await db.problem.findMany({
            where: {
                solvedBy: {
                    some: {
                        userId: req.user.id
                    }
                }
            },
            include:{
                solvedBy: {
                    where: {
                        userId: req.user.id
                    }
                }
            }
        })

        res.status(200).json({
            success: true,
            messsge: "Problem fetched successfully",
            problems
        })
    } catch (error) {
        console.error("Error fetching problems:", error);
        res.status(500).json({ error: "Failed to fetch problems" })

    }
};