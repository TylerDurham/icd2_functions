/****** Object:  StoredProcedure [dbo].[SEARCH_CODES]    Script Date: 6/7/2018 2:57:27 PM ******/
DROP PROCEDURE [dbo].[SEARCH_CODES]
GO

/****** Object:  StoredProcedure [dbo].[SEARCH_CODES]    Script Date: 6/7/2018 2:57:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      Tyler Durham
-- Create Date: 6/7/2018
-- Description: Leverages the full text index to search for codes.
-- =============================================
CREATE PROCEDURE [dbo].[SEARCH_CODES]
(
    @keywords VARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

		SELECT TOP (250) [Order]
		  ,[ICD10]
		  ,[HIPAA_valid]
		  ,[Short_Description]
		  ,[ChapterCodeKey]
		  ,[RowId]
	  FROM [dbo].[ICD10Codes]
	 -- WHERE CONTAINS(*, 'edema') and CONTAINS(*, 'diabetes') and CONTAINS(*, 'eye')
	 WHERE CONTAINS(Short_Description, @keywords)

END
GO

