<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StorePostRequest;
use App\Http\Requests\Api\UpdatePostRequest;
use App\Http\Resources\Api\PostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('category')
            ->when(request('search_category'), function ($q) {
                $q->where('category_id', request('search_category'));
            })
            ->when(request('search_id'), function ($q) {
                $q->where('id', request('search_id'));
            })
            ->when(request('search_title'), function ($q) {
                $q->where('title', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_content'), function ($q) {
                $q->where('content', 'like', '%' . request('search_content') . '%');
            })
            ->when(request('search_global'), function ($q) {
                $q->where(
                    function ($query) {
                        $query->where('id', request('search_global'))
                            ->orWhere('title', 'like', '%' . request('search_global') . '%')
                            ->Orwhere('content', 'like', '%' . request('search_global') . '%');
                    }
                );
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            info($filename);
        }
        $post = Post::create($request->validated());
        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->validated());
        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if (request()->user()->hasPermissionTo('posts.delete')) {
            $post->delete();
            return response()->noContent();
        }
        return response()->json([
            'errors' => 'not authorized'
        ], 403);
    }
}
