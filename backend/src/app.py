from flask import Flask, request, jsonify, session
from flask_cors import CORS
from models import db, User, Post, Iterm, AmazonData, RakutenData
import os

app = Flask(__name__)
CORS(app)  # クロスオリジンリソースシェアリングの有効化

# 必要な設定を追加
app.secret_key = os.urandom(24).hex()  # セッションを使用するために必要なシークレットキー
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/yourdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

# /login エンドポイント
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if user and user.password == data['password']:
        # ユーザーIDをセッションに保存
        session['user_id'] = user.id
        return jsonify({"message": "Login successful", "user": {"id": user.id, "username": user.username}}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# /signup エンドポイント
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    existing_user = User.query.filter_by(username=data['username']).first()

    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()

    # サインアップ成功時にユーザーIDをセッションに保存
    session['user_id'] = new_user.id

    return jsonify({"message": "Signup successful", "user": {"id": new_user.id, "username": new_user.username}}), 201

# /logout エンドポイント
@app.route('/logout', methods=['POST'])
def logout():
    # セッションからuser_idを削除
    session.pop('user_id', None)
    return jsonify({"message": "Logout successful"}), 200

# /post エンドポイント (GET)
@app.route('/post', methods=['GET'])
def get_post():
    posts = Post.query.all()
    post_list = [{"id": post.id, "column": post.column, "user_id": post.user_id, "content": post.content, "likes_count": post.likes_count} for post in posts]
    return jsonify({"message": "Fetched posts", "posts": post_list}), 200

# /post エンドポイント (POST)
@app.route('/post', methods=['POST'])
def create_post():
    data = request.json
    new_post = Post(column=data['column'], user_id=data['user_id'], content=data['content'], likes_count=data.get('likes_count', 0))

    db.session.add(new_post)
    db.session.commit()

    return jsonify({"message": "Post created", "post": {"id": new_post.id, "column": new_post.column, "user_id": new_post.user_id, "content": new_post.content, "likes_count": new_post.likes_count}}), 201

# /result エンドポイント
@app.route('/result', methods=['POST'])
def result():
    data = request.json
    # 処理のロジックをここに追加
    return jsonify({"message": "Result received", "data": data}), 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
