USE [project_1]
GO
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_role_id_role_fk]
GO
ALTER TABLE [dbo].[role_permission] DROP CONSTRAINT [role_permission_role_id_role_fk]
GO
ALTER TABLE [dbo].[role_permission] DROP CONSTRAINT [role_permission_permissions_id_permission_fk]
GO
/****** Object:  Table [dbo].[user]    Script Date: 20/09/2024 9:32:41 CH ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[user]') AND type in (N'U'))
DROP TABLE [dbo].[user]
GO
/****** Object:  Table [dbo].[role_permission]    Script Date: 20/09/2024 9:32:41 CH ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[role_permission]') AND type in (N'U'))
DROP TABLE [dbo].[role_permission]
GO
/****** Object:  Table [dbo].[role]    Script Date: 20/09/2024 9:32:41 CH ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[role]') AND type in (N'U'))
DROP TABLE [dbo].[role]
GO
/****** Object:  Table [dbo].[permissions]    Script Date: 20/09/2024 9:32:41 CH ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[permissions]') AND type in (N'U'))
DROP TABLE [dbo].[permissions]
GO
/****** Object:  Table [dbo].[permissions]    Script Date: 20/09/2024 9:32:41 CH ******/
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
/****** Object:  Table [dbo].[role]    Script Date: 20/09/2024 9:32:41 CH ******/
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
/****** Object:  Table [dbo].[role_permission]    Script Date: 20/09/2024 9:32:41 CH ******/
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
/****** Object:  Table [dbo].[user]    Script Date: 20/09/2024 9:32:41 CH ******/
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
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (1, N'ManagementUser                                    ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (2, N'Function2                                         ')
INSERT [dbo].[permissions] ([id_permission], [permission_name]) VALUES (3, N'ManagementPermission                              ')
GO
SET IDENTITY_INSERT [dbo].[role] ON 

INSERT [dbo].[role] ([id_role], [name_role]) VALUES (1, N'Giám đốc')
INSERT [dbo].[role] ([id_role], [name_role]) VALUES (2, N'Nhân viên')
SET IDENTITY_INSERT [dbo].[role] OFF
GO
SET IDENTITY_INSERT [dbo].[role_permission] ON 

INSERT [dbo].[role_permission] ([id_role_permission], [id_role], [id_permission]) VALUES (3, 1, 1)
SET IDENTITY_INSERT [dbo].[role_permission] OFF
GO
INSERT [dbo].[user] ([id_user], [name], [email], [phone], [address], [id_role]) VALUES (N'HP1F0EOnIQhqmhLH89hPEDq8bn92', N'Nguyen Quang Trung', N'qtrung1702@outlook.com', NULL, NULL, 1)
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
