import { NextResponse } from 'next/server'
import { logError, logInfo } from '@/utils/logger';

const SUPABASE_FUNCTION_URL = 'https://bvigrmajwdfpavxmxefl.supabase.co/functions/v1/recycle-grpc';

export async function POST(request) {
  try {
    logInfo('GrpcProxy', 'Request received');
    
    // Get method name dari query params
    const { searchParams } = new URL(request.url);
    const methodName = searchParams.get('method');
    
    logInfo('GrpcProxy', 'Method', methodName);
    
    if (!methodName) {
      return NextResponse.json(
        { error: 'Method name is required' },
        { status: 400 }
      );
    }

    // Get authorization header
    const authHeader = request.headers.get('authorization');
    logInfo('GrpcProxy', 'Has auth', !!authHeader);
    
    // Read binary body
    const body = await request.arrayBuffer();
    logInfo('GrpcProxy', 'Body size', body.byteLength);
    
    // Forward request ke Supabase Edge Function
    logInfo('GrpcProxy', 'Forwarding to', SUPABASE_FUNCTION_URL);
    
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': authHeader || '',
        'x-grpc-method': methodName,
      },
      body: body,
    });

    logInfo('GrpcProxy', 'Supabase response', {
      status: response.status,
      statusText: response.statusText
    });
    
    // Forward response
    if (!response.ok) {
      const errorText = await response.text();
      logError('GrpcProxy', new Error('Supabase error'), errorText);
      return new NextResponse(errorText, {
        status: response.status,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // Return binary response
    const responseBuffer = await response.arrayBuffer();
    logInfo('GrpcProxy', 'Success, response size', responseBuffer.byteLength);
    
    return new NextResponse(responseBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    
  } catch (error) {
    logError('GrpcProxy', error);
    return NextResponse.json(
      { error: error.message, stack: error.stack },
      { status: 500 }
    );
  }

}