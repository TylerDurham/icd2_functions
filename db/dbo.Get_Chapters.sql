/****** Object:  StoredProcedure [dbo].[GET_CHAPTERS]    Script Date: 6/7/2018 1:15:53 PM ******/
DROP PROCEDURE [dbo].[GET_CHAPTERS]
GO

/****** Object:  StoredProcedure [dbo].[GET_CHAPTERS]    Script Date: 6/7/2018 1:15:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      Tyler Durham
-- Create Date: 6/7/2018
-- Description: Gets a list of Chapters.
-- =============================================
CREATE PROCEDURE [dbo].[GET_CHAPTERS]

AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    SELECT [Code], [Chapter] FROM [dbo].[ICD10Chapters]
	ORDER BY [Code]
END
GO

