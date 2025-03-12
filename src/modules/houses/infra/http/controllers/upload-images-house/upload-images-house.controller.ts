import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UplaodImagesHouseUseCase } from 'src/domain/houses/application/use-cases/upload-images-house/upload-images-house';

@Controller('house/upload-images')
export class UploadImagesHouseController {
  constructor(private uploadImagesHouse: UplaodImagesHouseUseCase) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: (_, file, callback) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|avif)$/)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
      },
    }),
  )
  public async handle(@UploadedFiles() files: Express.Multer.File[]) {
    const parsedFiles = files.map((file) => ({
      buffer: file.buffer,
      fileName: file.originalname,
      mimeType: file.mimetype,
    }));

    const { houseImageIds } = await this.uploadImagesHouse.execute({
      images: parsedFiles,
    });

    return {
      houseImageIds,
    };
  }
}
