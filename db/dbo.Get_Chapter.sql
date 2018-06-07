/****** Object:  StoredProcedure [dbo].[GET_CHAPTER]    Script Date: 6/7/2018 1:15:14 PM ******/
DROP PROCEDURE [dbo].[GET_CHAPTER]
GO

/****** Object:  StoredProcedure [dbo].[GET_CHAPTER]    Script Date: 6/7/2018 1:15:14 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      Tyler Durham
-- Create Date: 6/7/2018
-- Description: Gets a single Chapter by Code.
-- =============================================
CREATE PROCEDURE [dbo].[GET_CHAPTER]
(
    -- Add the parameters for the stored procedure here
    @code VARCHAR(50)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    SELECT [Code], [Chapter] 
	FROM [dbo].[ICD10Chapters] 
	WHERE
		Code = @code 
	ORDER BY Code
END
GO

