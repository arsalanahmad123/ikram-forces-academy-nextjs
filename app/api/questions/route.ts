import { NextResponse } from 'next/server';
import connectDB from '@/config/connectDB';
import { Paper, Question } from '@/models/models';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: 'https://ik.imagekit.io/kog89p81e',
});

export async function POST(request: Request) {
  try {
    await connectDB();

    // Parse form data
    const formData = await request.formData();
    const paperId = formData.get('paperId') as string | null;
    const title = formData.get('title') as string | null;
    const options = formData.getAll('options') as string[];
    const correctAnswer = parseInt(formData.get('correctAnswer') as string);
    const image = formData.get('image') as File | null;

    // Check for missing or invalid fields
    if (!paperId || !title || !options || isNaN(correctAnswer)) {
      return NextResponse.json(
        { error: 'All fields are required and must be valid' },
        { status: 400 }
      );
    }

    // Check if paper exists
    const paper = await Paper.findOne({ _id: paperId });
    if (!paper) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    // Validate options and correctAnswer
    if (options.length !== 4) {
      return NextResponse.json(
        { error: 'There must be exactly 4 options' },
        { status: 400 }
      );
    }

    if (correctAnswer < 0 || correctAnswer >= options.length) {
      return NextResponse.json(
        { error: 'Correct answer index must be between 0 and 3' },
        { status: 400 }
      );
    }

    let imageUrl = null;

    // Handle image upload if provided
    if (image) {
      try {
        // Convert file to buffer
        const buffer = await image.arrayBuffer();
        const uploadResponse = await imagekit.upload({
          file: Buffer.from(buffer),
          fileName: `question-${Date.now()}`,
        });
        imageUrl = uploadResponse.url;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    // Create new question
    const question = await Question.create({
      paperId,
      title,
      options,
      correctAnswer,
      image: imageUrl,
    });

    // Append question ID to paper's questions array
    await Paper.findByIdAndUpdate(
      paperId,
      { $push: { questions: question._id } },
      { new: true }
    );

    return NextResponse.json(question, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/questions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { questionId, title, options, correctAnswer } = body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { title, options, correctAnswer },
      { new: true }
    );

    if (!updatedQuestion) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { questionId, paperId } = await request.json();

    // Delete the question by its ID
    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // Remove the question reference from the paper
    await Paper.findByIdAndUpdate(paperId, {
      $pull: { questions: questionId },
    });

    return NextResponse.json(
      {
        message: 'Question and its reference in the paper deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
