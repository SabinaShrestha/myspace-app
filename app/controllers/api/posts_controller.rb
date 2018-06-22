class Api::PostsController < ApplicationController
  # before_action :set_user
  before_action :set_post, except: [:index, :create]

  def index
    # posts = current_user.posts.all
    # render json: current_user.posts.all
    render json: Post.all
  end

  def show
    render json: current_user.posts
  end

  def create
    post = current_user.posts.create(post_params)
    if post.save
      render json: post
    else
      render json: post.errors
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors
    end
  end

  def destroy
    @post.destroy
  end


  private
    # def set_user
    #   @user = current.user
    # end

    def set_post
      @post = current_user.posts.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :body, :user_id)
    end
end
