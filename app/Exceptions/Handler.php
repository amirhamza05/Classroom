<?php

namespace App\Exceptions;

use App\Http\Controllers\Layout\LayoutController as Layout;

//validation exception
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        //dd($exception->getMessage());
        if ($this->isHttpException($exception)) {
            if (Layout::json()) {
                return response()->json([
                    'message' => $exception->getMessage() == "" ? $exception->getStatusCode()." Error Found" : $exception->getMessage(),
                ], $exception->getStatusCode());
            }
        }
        if ($exception instanceof ValidationException) {

        } else {
            if (Layout::json()) {
                return response()->json([
                    'message'    => $exception->getMessage(),
                    'debugUrl' => Layout::requestLayoutDebugUrl(),
                ], 500);
            }
        }

        return parent::render($request, $exception);
    }

    /**
     * Create a response object from the given validation exception.
     *
     * @param  \Illuminate\Validation\ValidationException  $e
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function convertValidationExceptionToResponse(ValidationException $e, $request)
    {
        if ($e->response) {
            return $e->response;
        }
        return response()->json([
            'error'    => 1,
            'errorMsg' => $e->validator->errors()->all(),
        ]);
    }
}
