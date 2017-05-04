# coding: utf-8
from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String, Table, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import NullType
from sqlalchemy.ext.declarative import declarative_base
def addItem(items,item):
    find=False
    for i in items:
        if i.id==item.id:
            i.ct +=item.ct
            find=True
            break
    if not find:
        items.append(item)
    return items

Base = declarative_base()
metadata = Base.metadata


# class AuthGroup(Base):
#     __tablename__ = 'auth_group'

#     id = Column(Integer, primary_key=True)
#     name = Column(String(80), nullable=False)


# class AuthGroupPermission(Base):
#     __tablename__ = 'auth_group_permissions'
#     __table_args__ = (
#         UniqueConstraint('group_id', 'permission_id'),
#     )

#     id = Column(Integer, primary_key=True)
#     group_id = Column(Integer, nullable=False, index=True)
#     permission_id = Column(ForeignKey('auth_permission.id'), nullable=False, index=True)

#     permission = relationship('AuthPermission')


# class AuthPermission(Base):
#     __tablename__ = 'auth_permission'
#     __table_args__ = (
#         UniqueConstraint('content_type_id', 'codename'),
#     )

#     id = Column(Integer, primary_key=True)
#     content_type_id = Column(ForeignKey('django_content_type.id'), nullable=False, index=True)
#     codename = Column(String(100), nullable=False)
#     name = Column(String(255), nullable=False)

#     content_type = relationship('DjangoContentType')


# class AuthUser(Base):
#     __tablename__ = 'auth_user'

#     id = Column(Integer, primary_key=True)
#     password = Column(String(128), nullable=False)
#     last_login = Column(DateTime)
#     is_superuser = Column(Boolean, nullable=False)
#     first_name = Column(String(30), nullable=False)
#     last_name = Column(String(30), nullable=False)
#     email = Column(String(254), nullable=False)
#     is_staff = Column(Boolean, nullable=False)
#     is_active = Column(Boolean, nullable=False)
#     date_joined = Column(DateTime, nullable=False)
#     username = Column(String(150), nullable=False)


# class AuthUserGroup(Base):
#     __tablename__ = 'auth_user_groups'
#     __table_args__ = (
#         UniqueConstraint('user_id', 'group_id'),
#     )

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, nullable=False, index=True)
#     group_id = Column(ForeignKey('auth_group.id'), nullable=False, index=True)

#     group = relationship('AuthGroup')


# class AuthUserUserPermission(Base):
#     __tablename__ = 'auth_user_user_permissions'
#     __table_args__ = (
#         UniqueConstraint('user_id', 'permission_id'),
#     )

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, nullable=False, index=True)
#     permission_id = Column(ForeignKey('auth_permission.id'), nullable=False, index=True)

#     permission = relationship('AuthPermission')


# class DjangoAdminLog(Base):
#     __tablename__ = 'django_admin_log'

#     id = Column(Integer, primary_key=True)
#     object_id = Column(Text)
#     object_repr = Column(String(200), nullable=False)
#     action_flag = Column(Integer, nullable=False)
#     change_message = Column(Text, nullable=False)
#     content_type_id = Column(ForeignKey('django_content_type.id'), index=True)
#     user_id = Column(ForeignKey('auth_user.id'), nullable=False, index=True)
#     action_time = Column(DateTime, nullable=False)

#     content_type = relationship('DjangoContentType')
#     user = relationship('AuthUser')


# class DjangoContentType(Base):
#     __tablename__ = 'django_content_type'
#     __table_args__ = (
#         UniqueConstraint('app_label', 'model'),
#     )

#     id = Column(Integer, primary_key=True)
#     app_label = Column(String(100), nullable=False)
#     model = Column(String(100), nullable=False)


# class DjangoMigration(Base):
#     __tablename__ = 'django_migrations'

#     id = Column(Integer, primary_key=True)
#     app = Column(String(255), nullable=False)
#     name = Column(String(255), nullable=False)
#     applied = Column(DateTime, nullable=False)


# class DjangoSession(Base):
#     __tablename__ = 'django_session'

#     session_key = Column(String(40), primary_key=True)
#     session_data = Column(Text, nullable=False)
#     expire_date = Column(DateTime, nullable=False, index=True)


# class DjangoSite(Base):
#     __tablename__ = 'django_site'

#     id = Column(Integer, primary_key=True)
#     domain = Column(String(100), nullable=False)
#     name = Column(String(50), nullable=False)


# class ExtjsCh11(Base):
#     __tablename__ = 'extjs_ch11'

#     id = Column(Integer, primary_key=True)
#     name = Column(String(30), nullable=False)
#     gender = Column(String(1), nullable=False)
#     dob = Column(Date, nullable=False)
#     epaper = Column(Boolean, nullable=False)


class PartsContact(Base):
    __tablename__ = 'parts_contact'

    id = Column(Integer, primary_key=True)
    yonghu = Column(Text(30), nullable=False)
    yiqixinghao = Column(Text(30), nullable=False)
    yiqibh = Column(Text(30), nullable=False)
    baoxiang = Column(Text(30), nullable=False)
    shenhe = Column(Text(30), nullable=False)
    yujifahuo_date = Column(Date, nullable=False)
    hetongbh = Column(Text(30), nullable=False, index=True)
    addr = Column(Text(30))
    channels = Column(Text(30))
    tiaoshi_date = Column(Date)
    method = Column(Text(200))
    def tablerow(self):
        return "%s\t%s\t%s\t%s\t%s\n" % (self.yonghu,self.addr,self.yiqixinghao,self.yiqibh,self.hetongbh)
    def huizong(self):
        items=[]
        items2=[]
        for cp in self.usepacks:
            for pi in cp.pack.packitems:
                pi.item.ct=pi.ct
                if not pi.quehuo:
                    items=addItem(items,pi.item)
                else:
                    items2=addItem(items2,pi.item)
        return (items,items2)
    def huizong2(self):
        items=[]
        items2=[]
        for cp in self.usepacks:
            if cp.pack.name!="调试必备":
                for pi in cp.pack.packitems:
                    pi.item.ct=pi.ct
                    if not pi.quehuo:
                        items=addItem(items,pi.item)
                    else:
                        items2=addItem(items2,pi.item)
        return (items,items2)       

class PartsDanju(Base):
    __tablename__ = 'parts_danju'

    id = Column(Integer, primary_key=True)
    danjuhao = Column(Text(30), nullable=False)
    danju_date = Column(Date, nullable=False)
    cangku = Column(Text(30), nullable=False)
    bumeng = Column(Text(30), nullable=False)
    gongying = Column(Text(30))
    shenhe = Column(Date)
    leibie = Column(Text(30))
    beizhu = Column(Text(30))
    filename = Column(Text(30))
    zhidan = Column(Text(30))
    qianzi = Column(Text(30))


class PartsDanjuitem(Base):
    __tablename__ = 'parts_danjuitem'

    id = Column(Integer, primary_key=True)
    danju_id = Column(ForeignKey('parts_pack.id'), nullable=False)
    item_id = Column(ForeignKey('parts_item.id'), nullable=False)
    ct = Column(Integer, nullable=False)

    danju = relationship('PartsPack')
    item = relationship('PartsItem')


class PartsItem(Base):
    __tablename__ = 'parts_item'

    id = Column(Integer, primary_key=True)
    bh = Column(Text(30), index=True)
    name = Column(Text(30), nullable=False, index=True)
    guige = Column(Text(30))
    ct = Column(Integer, nullable=False)
    danwei = Column(Text(30), nullable=False)
    image = Column(Text(100))
    name_en = Column(Text(30))
    beizhu = Column(Text(30))


class PartsPack(Base):
    __tablename__ = 'parts_pack'

    id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable=False, index=True)


class PartsPackContact(Base):
    __tablename__ = 'parts_pack_contact'
    __table_args__ = (
        UniqueConstraint('pack_id', 'contact_id'),
    )

    id = Column(Integer, primary_key=True)
    pack_id = Column(Integer, nullable=False, index=True)
    contact_id = Column(ForeignKey('parts_contact.id'), nullable=False, index=True)

    contact = relationship('PartsContact')


class PartsPackitem(Base):
    __tablename__ = 'parts_packitem'

    id = Column(Integer, primary_key=True)
    pack_id = Column(ForeignKey('parts_pack.id'), nullable=False, index=True)
    item_id = Column(ForeignKey('parts_item.id'), nullable=False, index=True)
    ct = Column(Float, nullable=False)
    quehuo = Column(Boolean)

    item = relationship('PartsItem')
    pack = relationship('PartsPack')


class PartsUsepack(Base):
    __tablename__ = 'parts_usepack'

    id = Column(Integer, primary_key=True)
    contact_id = Column(ForeignKey('parts_contact.id'), nullable=False, index=True)
    pack_id = Column(ForeignKey('parts_pack.id'), nullable=False, index=True)

    contact = relationship('PartsContact')
    pack = relationship('PartsPack')

PartsContact.usepacks = relationship(
    "PartsUsepack", order_by=PartsUsepack.id, back_populates="contact")
PartsPack.packitems = relationship(
    "PartsPackitem", order_by=PartsPackitem.id, back_populates="pack")
t_sqlite_sequence = Table(
    'sqlite_sequence', metadata,
    Column('name', NullType),
    Column('seq', NullType)
)
