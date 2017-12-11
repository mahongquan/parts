
-- Table: auth_user
CREATE TABLE auth_user ( 
    id           INTEGER         NOT NULL
                                 PRIMARY KEY AUTOINCREMENT,
    password     VARCHAR( 128 )  NOT NULL,
    last_login   DATETIME        NULL,
    is_superuser BOOL            NOT NULL,
    username     VARCHAR( 150 )  NOT NULL
                                 UNIQUE,
    first_name   VARCHAR( 30 )   NOT NULL,
    email        VARCHAR( 254 )  NOT NULL,
    is_staff     BOOL            NOT NULL,
    is_active    BOOL            NOT NULL,
    date_joined  DATETIME        NOT NULL,
    last_name    VARCHAR( 150 )  NOT NULL 
);


-- Table: django_content_type
CREATE TABLE django_content_type ( 
    id        INTEGER         NOT NULL
                              PRIMARY KEY AUTOINCREMENT,
    app_label VARCHAR( 100 )  NOT NULL,
    model     VARCHAR( 100 )  NOT NULL,
    UNIQUE ( app_label, model ) 
);


-- Table: parts_contact
CREATE TABLE parts_contact ( 
    id             INTEGER         PRIMARY KEY
                                   NOT NULL,
    yonghu         VARCHAR( 30 )   NOT NULL,
    yiqixinghao    VARCHAR( 30 )   NOT NULL,
    yiqibh         VARCHAR( 30 )   NOT NULL
                                   UNIQUE,
    baoxiang       VARCHAR( 30 )   NOT NULL,
    shenhe         VARCHAR( 30 )   NOT NULL,
    yujifahuo_date DATE            NOT NULL,
    hetongbh       VARCHAR( 30 )   NOT NULL,
    addr           VARCHAR( 30 ),
    channels       VARCHAR( 30 ),
    tiaoshi_date   DATE,
    method         VARCHAR( 200 ) 
);


-- Table: auth_permission
CREATE TABLE auth_permission ( 
    id              INTEGER         NOT NULL
                                    PRIMARY KEY AUTOINCREMENT,
    content_type_id INTEGER         NOT NULL
                                    REFERENCES django_content_type ( id ),
    codename        VARCHAR( 100 )  NOT NULL,
    name            VARCHAR( 255 )  NOT NULL,
    UNIQUE ( content_type_id, codename ) 
);


-- Table: auth_group_permissions
CREATE TABLE auth_group_permissions ( 
    id            INTEGER NOT NULL
                          PRIMARY KEY,
    group_id      INTEGER NOT NULL,
    permission_id INTEGER NOT NULL
                          REFERENCES auth_permission ( id ),
    UNIQUE ( group_id, permission_id ) 
);


-- Table: auth_group
CREATE TABLE auth_group ( 
    id   INTEGER        NOT NULL
                        PRIMARY KEY,
    name VARCHAR( 80 )  NOT NULL
                        UNIQUE 
);


-- Table: auth_user_user_permissions
CREATE TABLE auth_user_user_permissions ( 
    id            INTEGER NOT NULL
                          PRIMARY KEY,
    user_id       INTEGER NOT NULL,
    permission_id INTEGER NOT NULL
                          REFERENCES auth_permission ( id ),
    UNIQUE ( user_id, permission_id ) 
);


-- Table: auth_user_groups
CREATE TABLE auth_user_groups ( 
    id       INTEGER NOT NULL
                     PRIMARY KEY,
    user_id  INTEGER NOT NULL,
    group_id INTEGER NOT NULL
                     REFERENCES auth_group ( id ),
    UNIQUE ( user_id, group_id ) 
);


-- Table: django_session
CREATE TABLE django_session ( 
    session_key  VARCHAR( 40 )  NOT NULL
                                PRIMARY KEY,
    session_data TEXT           NOT NULL,
    expire_date  DATETIME       NOT NULL 
);


-- Table: django_site
CREATE TABLE django_site ( 
    id     INTEGER         NOT NULL
                           PRIMARY KEY,
    domain VARCHAR( 100 )  NOT NULL,
    name   VARCHAR( 50 )   NOT NULL 
);


-- Table: django_migrations
CREATE TABLE django_migrations ( 
    id      INTEGER         NOT NULL
                            PRIMARY KEY AUTOINCREMENT,
    app     VARCHAR( 255 )  NOT NULL,
    name    VARCHAR( 255 )  NOT NULL,
    applied DATETIME        NOT NULL 
);


-- Table: extjs_ch11
CREATE TABLE extjs_ch11 ( 
    id     INTEGER        NOT NULL
                          PRIMARY KEY AUTOINCREMENT,
    name   VARCHAR( 30 )  NOT NULL,
    gender VARCHAR( 1 )   NOT NULL,
    dob    DATE           NOT NULL,
    epaper BOOL           NOT NULL 
);


-- Table: parts_pack_contact
CREATE TABLE parts_pack_contact ( 
    id         INTEGER NOT NULL
                       PRIMARY KEY AUTOINCREMENT,
    pack_id    INTEGER NOT NULL,
    contact_id INTEGER NOT NULL
                       REFERENCES parts_contact ( id ),
    UNIQUE ( pack_id, contact_id ) 
);


-- Table: parts_pack
CREATE TABLE parts_pack ( 
    id   INTEGER        NOT NULL
                        PRIMARY KEY AUTOINCREMENT,
    name VARCHAR( 30 )  NOT NULL 
);


-- Table: parts_item
CREATE TABLE parts_item ( 
    id      INTEGER         PRIMARY KEY
                            NOT NULL,
    bh      VARCHAR( 30 ),
    name    VARCHAR( 30 )   NOT NULL,
    guige   VARCHAR( 30 ),
    ct      INTEGER         NOT NULL,
    danwei  VARCHAR( 30 )   NOT NULL,
    image   VARCHAR( 100 ),
    name_en CHAR( 30 ),
    beizhu  CHAR( 30 ) 
);


-- Table: django_admin_log
CREATE TABLE django_admin_log ( 
    id              INTEGER           NOT NULL
                                      PRIMARY KEY AUTOINCREMENT,
    object_id       TEXT              NULL,
    object_repr     VARCHAR( 200 )    NOT NULL,
    action_flag     SMALLINT UNSIGNED NOT NULL,
    change_message  TEXT              NOT NULL,
    content_type_id INTEGER           NULL
                                      REFERENCES django_content_type ( id ),
    user_id         INTEGER           NOT NULL
                                      REFERENCES auth_user ( id ),
    action_time     DATETIME          NOT NULL 
);


-- Table: parts_danju
CREATE TABLE parts_danju ( 
    id         INTEGER        PRIMARY KEY
                              NOT NULL,
    danjuhao   VARCHAR( 30 )  NOT NULL,
    danju_date DATE           NOT NULL,
    cangku     VARCHAR( 30 )  NOT NULL,
    bumeng     VARCHAR( 30 )  NOT NULL,
    gongying   VARCHAR( 30 ),
    shenhe     DATE,
    leibie     VARCHAR( 30 ),
    beizhu     VARCHAR( 30 ),
    filename   VARCHAR( 30 ),
    zhidan     VARCHAR( 30 ),
    qianzi     VARCHAR( 30 ) 
);


-- Table: parts_danjuitem
CREATE TABLE parts_danjuitem ( 
    id       INTEGER NOT NULL
                     PRIMARY KEY AUTOINCREMENT,
    danju_id INTEGER NOT NULL
                     REFERENCES parts_pack ( id ),
    item_id  INTEGER NOT NULL
                     REFERENCES parts_item ( id ),
    ct       INTEGER NOT NULL 
);


-- Table: parts_packitem
CREATE TABLE parts_packitem ( 
    id      INTEGER PRIMARY KEY AUTOINCREMENT
                    NOT NULL,
    pack_id INTEGER NOT NULL
                    REFERENCES parts_pack ( id ),
    item_id INTEGER NOT NULL
                    REFERENCES parts_item ( id ),
    ct      REAL    NOT NULL,
    quehuo  BOOLEAN 
);


-- Table: parts2_pack
CREATE TABLE parts2_pack ( 
    id   INTEGER        NOT NULL
                        PRIMARY KEY AUTOINCREMENT,
    name VARCHAR( 30 )  NOT NULL 
);


-- Table: parts2_item
CREATE TABLE parts2_item ( 
    id      INTEGER         PRIMARY KEY
                            NOT NULL,
    bh      VARCHAR( 30 ),
    name    VARCHAR( 30 )   NOT NULL,
    guige   VARCHAR( 30 ),
    ct      INTEGER         NOT NULL,
    danwei  VARCHAR( 30 )   NOT NULL,
    image   VARCHAR( 100 ),
    name_en CHAR( 30 ),
    beizhu  CHAR( 30 ) 
);


-- Table: parts_usepack
CREATE TABLE parts_usepack ( 
    id         INTEGER PRIMARY KEY AUTOINCREMENT
                       NOT NULL,
    contact_id INTEGER NOT NULL
                       REFERENCES parts_contact ( id ),
    pack_id    INTEGER NOT NULL
                       REFERENCES parts2_pack 
);


-- Index: auth_group_permissions_425ae3c4
CREATE INDEX auth_group_permissions_425ae3c4 ON auth_group_permissions ( 
    group_id 
);


-- Index: auth_group_permissions_1e014c8f
CREATE INDEX auth_group_permissions_1e014c8f ON auth_group_permissions ( 
    permission_id 
);


-- Index: auth_user_user_permissions_403f60f
CREATE INDEX auth_user_user_permissions_403f60f ON auth_user_user_permissions ( 
    user_id 
);


-- Index: auth_user_user_permissions_1e014c8f
CREATE INDEX auth_user_user_permissions_1e014c8f ON auth_user_user_permissions ( 
    permission_id 
);


-- Index: auth_user_groups_403f60f
CREATE INDEX auth_user_groups_403f60f ON auth_user_groups ( 
    user_id 
);


-- Index: auth_user_groups_425ae3c4
CREATE INDEX auth_user_groups_425ae3c4 ON auth_user_groups ( 
    group_id 
);


-- Index: django_session_3da3d3d8
CREATE INDEX django_session_3da3d3d8 ON django_session ( 
    expire_date 
);


-- Index: parts_pack_contact_9391bab4
CREATE INDEX parts_pack_contact_9391bab4 ON parts_pack_contact ( 
    pack_id 
);


-- Index: parts_pack_contact_816533ed
CREATE INDEX parts_pack_contact_816533ed ON parts_pack_contact ( 
    contact_id 
);


-- Index: auth_permission_417f1b1c
CREATE INDEX auth_permission_417f1b1c ON auth_permission ( 
    content_type_id 
);


-- Index: django_admin_log_417f1b1c
CREATE INDEX django_admin_log_417f1b1c ON django_admin_log ( 
    content_type_id 
);


-- Index: django_admin_log_e8701ad4
CREATE INDEX django_admin_log_e8701ad4 ON django_admin_log ( 
    user_id 
);


-- Index: item_bh
CREATE INDEX item_bh ON parts_item ( 
    bh 
);


-- Index: item_name
CREATE INDEX item_name ON parts_item ( 
    name 
);


-- Index: pack_name
CREATE INDEX pack_name ON parts_pack ( 
    name 
);


-- Index: contact_bh
CREATE INDEX contact_bh ON parts_contact ( 
    hetongbh 
);


-- Index: parts_packitem_9391bab4
CREATE INDEX parts_packitem_9391bab4 ON parts_packitem ( 
    pack_id 
);


-- Index: parts_packitem_0a47aae8
CREATE INDEX parts_packitem_0a47aae8 ON parts_packitem ( 
    item_id 
);


-- Index: parts_contactpack_816533ed
CREATE INDEX parts_contactpack_816533ed ON parts_usepack ( 
    contact_id 
);


-- Index: parts_contactpack_9391bab4
CREATE INDEX parts_contactpack_9391bab4 ON parts_usepack ( 
    pack_id 
);

