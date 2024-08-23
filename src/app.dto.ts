import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Type as IsType } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class StatusMessage<T> {
  @IsType(() => Object)
  data: T;

  @IsString()
  message?: string;

  @IsBoolean()
  success: boolean;
}

export const ApiGenericResponse = <TModel extends Type<unknown>>(
  model: TModel,
) =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(StatusMessage) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
    ApiExtraModels(StatusMessage, model),
  );
