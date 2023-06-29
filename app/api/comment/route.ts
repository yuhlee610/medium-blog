import createComment from '@/app/services/sanity/createComment';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const bodyData = await req.json();
    await createComment(bodyData);
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not submit comment', error },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: 'Comment submitted' },
    { status: 200 }
  );
}
