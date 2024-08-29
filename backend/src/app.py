from flask import Flask, request, jsonify, session
from flask_cors import CORS
from model import db, User, Post, Iterm, AmazonData, RakutenData
import os

app = Flask(__name__)
# CORSの設定でクレデンシャルを許可
CORS(app, supports_credentials=True)

# 必要な設定を追加
app.secret_key = os.urandom(24).hex()  # セッションを使用するために必要なシークレットキー
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:postgres@db:5432/hack'  # 修正: localhostをdbに変更
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    
    # デフォルトのユーザーを作成
    default_user = User.query.filter_by(username='default_user').first()
    if not default_user:
        default_user = User(username='default_user', password='password')
        db.session.add(default_user)
        db.session.commit()

    # デフォルトのアイテムを作成
    default_items = []
    for i in range(7):
        item_name = f'Item {i+1}'
        item = Iterm.query.filter_by(name=item_name).first()
        if not item:
            item = Iterm(name=item_name)
            db.session.add(item)
            db.session.commit()
        default_items.append(item)

    # デフォルトのPostデータを挿入
    if not Post.query.first():  # データが既に存在しない場合のみ挿入
        default_posts = [
            Post(
                column=f'Column {i+1}',
                user_id=default_user.id,
                item_id=default_items[i % 7].id,  # 7個のアイテムに循環して割り当て
                content=f'Default content {i+1}',
                likes_count=10
            )
            for i in range(7)  # 7個のPostを作成
        ]
        db.session.bulk_save_objects(default_posts)
        db.session.commit()


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

# /post エンドポイント (POST)
@app.route('/post', methods=['POST'])
def create_post():
    data = request.json
    new_post = Post(column=data['column'], user_id=data['user_id'], content=data['content'], likes_count=data.get('likes_count', 0))

    db.session.add(new_post)
    db.session.commit()

    return jsonify({"message": "Post created", "post": {"id": new_post.id, "column": new_post.column, "user_id": new_post.user_id, "content": new_post.content, "likes_count": new_post.likes_count}}), 201

@app.route('/post', methods=['GET'])
def get_post():
    # Query to fetch posts along with the associated username
    posts = db.session.query(Post, User.username).join(User, Post.user_id == User.id).all()
    
    # Create a list of posts with username included
    post_list = [
        {
            "id": post.id,
            "column": post.column,
            "user_id": post.user_id,
            "item_id": post.item_id,
            "content": post.content,
            "likes_count": post.likes_count,
            "username": username  # Add username to the response
        }
        for post, username in posts
    ]
    
    return jsonify({"message": "Fetched posts", "posts": post_list}), 200


# /result エンドポイント
@app.route('/result', methods=['POST'])
def result():
    data = request.json
    # 処理のロジックをここに追加
    return jsonify({"message": "Result received", "data": data}), 200

@app.route('/currentuser', methods=['GET'])
def current_user():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify({"user": {"id": user.id, "username": user.username}}), 200
    return jsonify({"user": None}), 200

# /like エンドポイント (POST)
@app.route('/post/<int:post_id>/like', methods=['POST'])
def like_post(post_id):
    post = Post.query.get(post_id)
    if post:
        post.likes_count += 1
        db.session.commit()
        return jsonify({"message": "Like added", "post": {"id": post.id, "likes_count": post.likes_count}}), 200
    else:
        return jsonify({"message": "Post not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")


