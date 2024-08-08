import { PartialType } from '@nestjs/swagger';
import { CreateComboDetailDto } from './create-combo_detail.dto';

export class UpdateComboDetailDto extends PartialType(CreateComboDetailDto) {}
