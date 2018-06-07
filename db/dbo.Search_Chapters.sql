/****** Object:  StoredProcedure [dbo].[SEARCH_CHAPTERS]    Script Date: 6/7/2018 1:16:28 PM ******/
DROP PROCEDURE [dbo].[SEARCH_CHAPTERS]
GO

/****** Object:  StoredProcedure [dbo].[SEARCH_CHAPTERS]    Script Date: 6/7/2018 1:16:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      Tyler Durham
-- Create Date: 6/7/2018
-- Description: Searches for chapters using full text index.
-- =============================================
CREATE PROCEDURE [dbo].[SEARCH_CHAPTERS]
(
    @keywords VARCHAR(100)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    SELECT
		[Code],
		[Chapter]
	FROM [dbo].[ICD10Chapters]
	WHERE FREETEXT(Chapter, @keywords)
END
GO


