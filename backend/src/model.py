from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Userテーブルのモデル
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    
    # リレーションシップ（ユーザーが複数のポストを持つ）
    posts = db.relationship('Post', backref='user', lazy=True)

# Postテーブルのモデル
class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    column = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('iterms.id'), nullable=False)  # item_idカラムを追加
    content = db.Column(db.Text, nullable=False)
    likes_count = db.Column(db.Integer, default=0)

    # リレーションシップ（Postが1つのItemに関連付けられる）
    item = db.relationship('Iterm', backref='posts', lazy=True)

# Itermテーブルのモデル
class Iterm(db.Model):
    __tablename__ = 'iterms'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    # リレーションシップ（Itermが複数のAmazonDataとRakutenDataを持つ）
    amazon_data = db.relationship('AmazonData', backref='iterm', lazy=True)
    rakuten_data = db.relationship('RakutenData', backref='iterm', lazy=True)

# AmazonDataテーブルのモデル
class AmazonData(db.Model):
    __tablename__ = 'amazon_data'
    
    id = db.Column(db.Integer, primary_key=True)
    iterm_id = db.Column(db.Integer, db.ForeignKey('iterms.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    other_conditions = db.Column(db.Text, nullable=True)  # 他の条件

# RakutenDataテーブルのモデル
class RakutenData(db.Model):
    __tablename__ = 'rakuten_data'
    
    id = db.Column(db.Integer, primary_key=True)
    iterm_id = db.Column(db.Integer, db.ForeignKey('iterms.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    other_conditions = db.Column(db.Text, nullable=True)  # 他の条件
