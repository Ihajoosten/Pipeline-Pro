# TODO List

1. Define the ReportExportStrategy interface with an exportReport method

2. Implement the PdfExportStrategy, PngExportStrategy, and JpgExportStrategy classes that implement the ReportExportStrategy interface

3. Define the Report class that holds the report data

4. Implement the ReportExporter class that uses the selected export strategy to generate reports

5. Create a new Report object for each sprint report, and then create a ReportExporter object with the appropriate export strategy

6. Call the exportReport method on the ReportExporter object to generate the report in the desired format

# Summary

The Strategy pattern allows you to define a family of interchangeable algorithms or behaviors and encapsulate each one into a separate class. In this case, we use the pattern to implement a report export functionality that can generate sprint reports in different formats (PDF, PNG, JPG). The ReportExportStrategy interface defines a method for exporting a Report object, and the PdfExportStrategy, PngExportStrategy, and JpgExportStrategy classes provide concrete implementations of this method for each supported format. The ReportExporter context object is responsible for using the appropriate export strategy
