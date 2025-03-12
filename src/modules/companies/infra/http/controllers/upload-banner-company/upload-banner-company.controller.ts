import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadBannerCompanyUseCase } from 'src/domain/companies/application/use-cases/upload-banner-company/upload-banner-company';

@Controller('companies/upload-banner')
export class UploadBannerCompanyController {
  constructor(private uploadBannerCompany: UploadBannerCompanyUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async handle(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        errorHttpStatusCode: 400,
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({
            fileType: /^(image\/jpeg|image\/png)$/,
          }),
        ],
      }),
    )
    { buffer, originalname, mimetype }: Express.Multer.File,
  ) {
    const { bannerCompanyId } = await this.uploadBannerCompany.execute({
      buffer,
      fileName: originalname,
      mimeType: mimetype,
    });

    return {
      bannerCompanyId,
    };
  }
}
