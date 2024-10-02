USE [project_1]
GO
/****** Object:  Table [dbo].[permissions]    Script Date: 02/10/2024 10:31:24 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permissions](
	[id_permission] [int] NOT NULL,
	[permission_name] [nchar](50) NULL,
 CONSTRAINT [permissions_pk] PRIMARY KEY CLUSTERED 
(
	[id_permission] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 02/10/2024 10:31:25 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[id_role] [int] IDENTITY(1,1) NOT NULL,
	[name_role] [nvarchar](255) NULL,
 CONSTRAINT [role_pk] PRIMARY KEY CLUSTERED 
(
	[id_role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_permission]    Script Date: 02/10/2024 10:31:25 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_permission](
	[id_role_permission] [int] IDENTITY(1,1) NOT NULL,
	[id_role] [int] NULL,
	[id_permission] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 02/10/2024 10:31:25 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id_user] [nvarchar](255) NOT NULL,
	[name] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[address] [nvarchar](255) NULL,
	[id_role] [int] NULL,
 CONSTRAINT [user_pk] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (1, N'USER_MANAGEMENT                                   ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (2, N'Function2                                         ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (3, N'ADD_USER                                          ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (4, N'EDIT_USER                                         ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (5, N'DELETE_USER                                       ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (6, N'AUTHORIZATION                                     ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (7, N'FUNCTION3                                         ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (8, N'ITEM_MANAGEMENT                                   ')
GO
SET IDENTITY_INSERT [dbo].[role] ON 

INSERT [dbo].[role] ([id_role], [name_role]) VALUES (1, N'Giám đốc')
INSERT [dbo].[role] ([id_role], [name_role]) VALUES (8, N'Vai trò a')
INSERT [dbo].[role] ([id_role], [name_role]) VALUES (9, N'Vai trò C')
SET IDENTITY_INSERT [dbo].[role] OFF
GO
SET IDENTITY_INSERT [dbo].[role_permission] ON 

INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (183, 1, 1)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (184, 1, 2)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (185, 1, 3)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (186, 1, 4)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (187, 1, 5)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (188, 1, 6)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (137, 9, 1)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (138, 9, 2)
INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (139, 9, 3)
SET IDENTITY_INSERT [dbo].[role_permission] OFF
GO
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'HP1F0EOnIQhqmhLH89hPEDq8bn92', N'Nguyen Quang Trung', N'qtrung1702@outlook.com', N'0369033543', NULL, 1)
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'n95R3v1RgRZaQ8Ff0rYyMFQiKS23', N'Kaka', N'qtrung1702x2@outlook.com', N'0369033543', N'23/36/19 Đ. Nguyễn Hữu Tiến, P. Tây Thạnh', 1)
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'string', N'string', N'string', N'string', N'string', 1)
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'xxxxx', N'test', N'q32321', N'32132', N'140 Lê Trọng Tấn, Tây Thạnh, Tân Phú', 1)
GO
ALTER TABLE [dbo].[role_permission]  WITH CHECK ADD  CONSTRAINT [role_permission_permissions_id_permission_fk] FOREIGN KEY([id_permission])
REFERENCES [dbo].[permissions] ([id_permission])
GO
ALTER TABLE [dbo].[role_permission] CHECK CONSTRAINT [role_permission_permissions_id_permission_fk]
GO
ALTER TABLE [dbo].[role_permission]  WITH CHECK ADD  CONSTRAINT [role_permission_role_id_role_fk] FOREIGN KEY([id_role])
REFERENCES [dbo].[role] ([id_role])
GO
ALTER TABLE [dbo].[role_permission] CHECK CONSTRAINT [role_permission_role_id_role_fk]
GO
ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [user_role_id_role_fk] FOREIGN KEY([id_role])
REFERENCES [dbo].[role] ([id_role])
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [user_role_id_role_fk]
GO
