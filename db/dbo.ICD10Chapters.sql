/****** Object:  Table [dbo].[ICD10Chapters]    Script Date: 6/7/2018 1:17:05 PM ******/
DROP TABLE [dbo].[ICD10Chapters]
GO

/****** Object:  Table [dbo].[ICD10Chapters]    Script Date: 6/7/2018 1:17:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ICD10Chapters](
	[Code] [varchar](50) NOT NULL,
	[Chapter] [varchar](200) NULL,
 CONSTRAINT [PK_ICD10Chapters] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

