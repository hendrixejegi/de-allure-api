// import {
//   Decimal as PrismaDecimal,
//   DecimalJsLike,
// } from '@prisma/client/runtime/library';

import {
  Decimal as PrismaDecimal,
  type DecimalJsLike,
} from '@prisma/client/runtime/client';
import { z } from 'zod';

import { Prisma } from '../prisma/client';
/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.any(),
});

export const DECIMAL_STRING_REGEX =
  /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput = (
  v?: null | string | number | DecimalJsLike,
): v is string | number | DecimalJsLike => {
  if (v === undefined || v === null) return false;
  return (
    (typeof v === 'object' &&
      'd' in v &&
      'e' in v &&
      's' in v &&
      'toFixed' in v) ||
    (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
    typeof v === 'number'
  );
};

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'emailVerified',
  'image',
  'createdAt',
  'updatedAt',
]);

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'expiresAt',
  'token',
  'createdAt',
  'updatedAt',
  'ipAddress',
  'userAgent',
  'userId',
]);

export const AccountScalarFieldEnumSchema = z.enum([
  'id',
  'accountId',
  'providerId',
  'userId',
  'accessToken',
  'refreshToken',
  'idToken',
  'accessTokenExpiresAt',
  'refreshTokenExpiresAt',
  'scope',
  'password',
  'createdAt',
  'updatedAt',
]);

export const VerificationScalarFieldEnumSchema = z.enum([
  'id',
  'identifier',
  'value',
  'expiresAt',
  'createdAt',
  'updatedAt',
]);

export const ProductScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'image',
  'rating',
  'sex',
  'concentration',
  'isActive',
  'createdAt',
  'updatedAt',
]);

export const VariantScalarFieldEnumSchema = z.enum([
  'id',
  'productId',
  'sizeMl',
  'sellingPrice',
  'costPrice',
  'sku',
  'createdAt',
  'updatedAt',
]);

export const StockScalarFieldEnumSchema = z.enum([
  'id',
  'variantId',
  'quantity',
]);

export const ComboScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'image',
  'sellingPrice',
  'stockQuantity',
  'isActive',
  'createdAt',
  'updatedAt',
]);

export const ComboItemScalarFieldEnumSchema = z.enum([
  'id',
  'variantId',
  'comboId',
  'quantity',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);

export const ConcentrationSchema = z.enum(['OIL', 'EDT', 'EDP']);

export type ConcentrationType = `${z.infer<typeof ConcentrationSchema>}`;

export const SexSchema = z.enum(['M', 'F', 'UNI']);

export type SexType = `${z.infer<typeof SexSchema>}`;

export const SizeMlSchema = z.enum(['ML_10', 'ML_15', 'ML_30', 'ML_100']);

export type SizeMlType = `${z.infer<typeof SizeMlSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Verification = z.infer<typeof VerificationSchema>;

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  sex: SexSchema,
  concentration: ConcentrationSchema,
  id: z.number().int(),
  name: z.string(),
  image: z.string().nullable(),
  rating: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Product = z.infer<typeof ProductSchema>;

/////////////////////////////////////////
// VARIANT SCHEMA
/////////////////////////////////////////

export const VariantSchema = z.object({
  sizeMl: SizeMlSchema,
  id: z.number().int(),
  productId: z.number().int(),
  sellingPrice: z.instanceof(PrismaDecimal, {
    message:
      "Field 'sellingPrice' must be a Decimal. Location: ['Models', 'Variant']",
  }),
  costPrice: z.instanceof(PrismaDecimal, {
    message:
      "Field 'costPrice' must be a Decimal. Location: ['Models', 'Variant']",
  }),
  sku: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Variant = z.infer<typeof VariantSchema>;

/////////////////////////////////////////
// STOCK SCHEMA
/////////////////////////////////////////

export const StockSchema = z.object({
  id: z.number().int(),
  variantId: z.number().int(),
  quantity: z.number().int(),
});

export type Stock = z.infer<typeof StockSchema>;

/////////////////////////////////////////
// COMBO SCHEMA
/////////////////////////////////////////

export const ComboSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  image: z.string().nullable(),
  sellingPrice: z.instanceof(PrismaDecimal, {
    message:
      "Field 'sellingPrice' must be a Decimal. Location: ['Models', 'Combo']",
  }),
  stockQuantity: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Combo = z.infer<typeof ComboSchema>;

/////////////////////////////////////////
// COMBO ITEM SCHEMA
/////////////////////////////////////////

export const ComboItemSchema = z.object({
  id: z.number().int(),
  variantId: z.number().int(),
  comboId: z.number().int(),
  quantity: z.number().int(),
});

export type ComboItem = z.infer<typeof ComboItemSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      sessions: z.boolean().optional(),
      accounts: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionSelectSchema).optional(),
    include: z.lazy(() => SessionIncludeSchema).optional(),
  })
  .strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
  .object({
    id: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    token: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    ipAddress: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
  .object({
    select: z.lazy(() => AccountSelectSchema).optional(),
    include: z.lazy(() => AccountIncludeSchema).optional(),
  })
  .strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
  .object({
    id: z.boolean().optional(),
    accountId: z.boolean().optional(),
    providerId: z.boolean().optional(),
    userId: z.boolean().optional(),
    accessToken: z.boolean().optional(),
    refreshToken: z.boolean().optional(),
    idToken: z.boolean().optional(),
    accessTokenExpiresAt: z.boolean().optional(),
    refreshTokenExpiresAt: z.boolean().optional(),
    scope: z.boolean().optional(),
    password: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// VERIFICATION
//------------------------------------------------------

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z
  .object({
    id: z.boolean().optional(),
    identifier: z.boolean().optional(),
    value: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z
  .object({
    variants: z
      .union([z.boolean(), z.lazy(() => VariantFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductSelectSchema).optional(),
    include: z.lazy(() => ProductIncludeSchema).optional(),
  })
  .strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> =
  z
    .object({
      variants: z.boolean().optional(),
    })
    .strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    image: z.boolean().optional(),
    rating: z.boolean().optional(),
    sex: z.boolean().optional(),
    concentration: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    variants: z
      .union([z.boolean(), z.lazy(() => VariantFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// VARIANT
//------------------------------------------------------

export const VariantIncludeSchema: z.ZodType<Prisma.VariantInclude> = z
  .object({
    comboItem: z
      .union([z.boolean(), z.lazy(() => ComboItemFindManyArgsSchema)])
      .optional(),
    stock: z.union([z.boolean(), z.lazy(() => StockArgsSchema)]).optional(),
    product: z.union([z.boolean(), z.lazy(() => ProductArgsSchema)]).optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => VariantCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const VariantArgsSchema: z.ZodType<Prisma.VariantDefaultArgs> = z
  .object({
    select: z.lazy(() => VariantSelectSchema).optional(),
    include: z.lazy(() => VariantIncludeSchema).optional(),
  })
  .strict();

export const VariantCountOutputTypeArgsSchema: z.ZodType<Prisma.VariantCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => VariantCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const VariantCountOutputTypeSelectSchema: z.ZodType<Prisma.VariantCountOutputTypeSelect> =
  z
    .object({
      comboItem: z.boolean().optional(),
    })
    .strict();

export const VariantSelectSchema: z.ZodType<Prisma.VariantSelect> = z
  .object({
    id: z.boolean().optional(),
    productId: z.boolean().optional(),
    sizeMl: z.boolean().optional(),
    sellingPrice: z.boolean().optional(),
    costPrice: z.boolean().optional(),
    sku: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    comboItem: z
      .union([z.boolean(), z.lazy(() => ComboItemFindManyArgsSchema)])
      .optional(),
    stock: z.union([z.boolean(), z.lazy(() => StockArgsSchema)]).optional(),
    product: z.union([z.boolean(), z.lazy(() => ProductArgsSchema)]).optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => VariantCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// STOCK
//------------------------------------------------------

export const StockIncludeSchema: z.ZodType<Prisma.StockInclude> = z
  .object({
    variant: z.union([z.boolean(), z.lazy(() => VariantArgsSchema)]).optional(),
  })
  .strict();

export const StockArgsSchema: z.ZodType<Prisma.StockDefaultArgs> = z
  .object({
    select: z.lazy(() => StockSelectSchema).optional(),
    include: z.lazy(() => StockIncludeSchema).optional(),
  })
  .strict();

export const StockSelectSchema: z.ZodType<Prisma.StockSelect> = z
  .object({
    id: z.boolean().optional(),
    variantId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    variant: z.union([z.boolean(), z.lazy(() => VariantArgsSchema)]).optional(),
  })
  .strict();

// COMBO
//------------------------------------------------------

export const ComboIncludeSchema: z.ZodType<Prisma.ComboInclude> = z
  .object({
    comboItems: z
      .union([z.boolean(), z.lazy(() => ComboItemFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ComboCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ComboArgsSchema: z.ZodType<Prisma.ComboDefaultArgs> = z
  .object({
    select: z.lazy(() => ComboSelectSchema).optional(),
    include: z.lazy(() => ComboIncludeSchema).optional(),
  })
  .strict();

export const ComboCountOutputTypeArgsSchema: z.ZodType<Prisma.ComboCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ComboCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ComboCountOutputTypeSelectSchema: z.ZodType<Prisma.ComboCountOutputTypeSelect> =
  z
    .object({
      comboItems: z.boolean().optional(),
    })
    .strict();

export const ComboSelectSchema: z.ZodType<Prisma.ComboSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    image: z.boolean().optional(),
    sellingPrice: z.boolean().optional(),
    stockQuantity: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    comboItems: z
      .union([z.boolean(), z.lazy(() => ComboItemFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ComboCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// COMBO ITEM
//------------------------------------------------------

export const ComboItemIncludeSchema: z.ZodType<Prisma.ComboItemInclude> = z
  .object({
    combo: z.union([z.boolean(), z.lazy(() => ComboArgsSchema)]).optional(),
    variant: z.union([z.boolean(), z.lazy(() => VariantArgsSchema)]).optional(),
  })
  .strict();

export const ComboItemArgsSchema: z.ZodType<Prisma.ComboItemDefaultArgs> = z
  .object({
    select: z.lazy(() => ComboItemSelectSchema).optional(),
    include: z.lazy(() => ComboItemIncludeSchema).optional(),
  })
  .strict();

export const ComboItemSelectSchema: z.ZodType<Prisma.ComboItemSelect> = z
  .object({
    id: z.boolean().optional(),
    variantId: z.boolean().optional(),
    comboId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    combo: z.union([z.boolean(), z.lazy(() => ComboArgsSchema)]).optional(),
    variant: z.union([z.boolean(), z.lazy(() => VariantArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    emailVerified: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
    accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  });

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    sessions: z
      .lazy(() => SessionOrderByRelationAggregateInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        email: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        email: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.string().optional(),
        email: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => UserWhereInputSchema),
            z.lazy(() => UserWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => UserWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => UserWhereInputSchema),
            z.lazy(() => UserWhereInputSchema).array(),
          ])
          .optional(),
        name: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        emailVerified: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        image: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
        accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
      }),
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  });

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    email: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    emailVerified: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    image: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    ipAddress: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  });

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userAgent: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  });

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        token: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        token: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.string().optional(),
        token: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => SessionWhereInputSchema),
            z.lazy(() => SessionWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => SessionWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => SessionWhereInputSchema),
            z.lazy(() => SessionWhereInputSchema).array(),
          ])
          .optional(),
        expiresAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        ipAddress: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        userAgent: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        userId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        user: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userAgent: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
  });

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    expiresAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    token: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  });

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accessToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    idToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    password: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  });

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    refreshToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    idToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    accessTokenExpiresAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    refreshTokenExpiresAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    scope: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    password: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  });

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z.strictObject({
        id: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => AccountWhereInputSchema),
            z.lazy(() => AccountWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => AccountWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => AccountWhereInputSchema),
            z.lazy(() => AccountWhereInputSchema).array(),
          ])
          .optional(),
        accountId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        providerId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        userId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        accessToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        refreshToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        idToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        accessTokenExpiresAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        refreshTokenExpiresAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        scope: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        password: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        user: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    refreshToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    idToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    accessTokenExpiresAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    refreshTokenExpiresAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    scope: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    password: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  });

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    accountId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    providerId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    accessToken: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VerificationWhereInputSchema),
        z.lazy(() => VerificationWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VerificationWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VerificationWhereInputSchema),
        z.lazy(() => VerificationWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    identifier: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z.strictObject({
        id: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => VerificationWhereInputSchema),
            z.lazy(() => VerificationWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => VerificationWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => VerificationWhereInputSchema),
            z.lazy(() => VerificationWhereInputSchema).array(),
          ])
          .optional(),
        identifier: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        value: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        expiresAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
      }),
    );

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => VerificationCountOrderByAggregateInputSchema)
      .optional(),
    _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional(),
  });

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VerificationScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    identifier: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    value: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    expiresAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ProductWhereInputSchema),
        z.lazy(() => ProductWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProductWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProductWhereInputSchema),
        z.lazy(() => ProductWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    rating: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    sex: z
      .union([z.lazy(() => EnumSexFilterSchema), z.lazy(() => SexSchema)])
      .optional(),
    concentration: z
      .union([
        z.lazy(() => EnumConcentrationFilterSchema),
        z.lazy(() => ConcentrationSchema),
      ])
      .optional(),
    isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    variants: z.lazy(() => VariantListRelationFilterSchema).optional(),
  });

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
    sex: z.lazy(() => SortOrderSchema).optional(),
    concentration: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    variants: z
      .lazy(() => VariantOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        name: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        name: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.number().int().optional(),
        name: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => ProductWhereInputSchema),
            z.lazy(() => ProductWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => ProductWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => ProductWhereInputSchema),
            z.lazy(() => ProductWhereInputSchema).array(),
          ])
          .optional(),
        image: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        rating: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        sex: z
          .union([z.lazy(() => EnumSexFilterSchema), z.lazy(() => SexSchema)])
          .optional(),
        concentration: z
          .union([
            z.lazy(() => EnumConcentrationFilterSchema),
            z.lazy(() => ConcentrationSchema),
          ])
          .optional(),
        isActive: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        variants: z.lazy(() => VariantListRelationFilterSchema).optional(),
      }),
    );

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
    sex: z.lazy(() => SortOrderSchema).optional(),
    concentration: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => ProductAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => ProductSumOrderByAggregateInputSchema).optional(),
  });

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProductScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    image: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    rating: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    sex: z
      .union([
        z.lazy(() => EnumSexWithAggregatesFilterSchema),
        z.lazy(() => SexSchema),
      ])
      .optional(),
    concentration: z
      .union([
        z.lazy(() => EnumConcentrationWithAggregatesFilterSchema),
        z.lazy(() => ConcentrationSchema),
      ])
      .optional(),
    isActive: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const VariantWhereInputSchema: z.ZodType<Prisma.VariantWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VariantWhereInputSchema),
        z.lazy(() => VariantWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VariantWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VariantWhereInputSchema),
        z.lazy(() => VariantWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    productId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    sizeMl: z
      .union([z.lazy(() => EnumSizeMlFilterSchema), z.lazy(() => SizeMlSchema)])
      .optional(),
    sellingPrice: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
      ])
      .optional(),
    costPrice: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
      ])
      .optional(),
    sku: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    comboItem: z.lazy(() => ComboItemListRelationFilterSchema).optional(),
    stock: z
      .union([
        z.lazy(() => StockNullableScalarRelationFilterSchema),
        z.lazy(() => StockWhereInputSchema),
      ])
      .optional()
      .nullable(),
    product: z
      .union([
        z.lazy(() => ProductScalarRelationFilterSchema),
        z.lazy(() => ProductWhereInputSchema),
      ])
      .optional(),
  });

export const VariantOrderByWithRelationInputSchema: z.ZodType<Prisma.VariantOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    sizeMl: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    costPrice: z.lazy(() => SortOrderSchema).optional(),
    sku: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    comboItem: z
      .lazy(() => ComboItemOrderByRelationAggregateInputSchema)
      .optional(),
    stock: z.lazy(() => StockOrderByWithRelationInputSchema).optional(),
    product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  });

export const VariantWhereUniqueInputSchema: z.ZodType<Prisma.VariantWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        sku: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        sku: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.number().int().optional(),
        sku: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => VariantWhereInputSchema),
            z.lazy(() => VariantWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => VariantWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => VariantWhereInputSchema),
            z.lazy(() => VariantWhereInputSchema).array(),
          ])
          .optional(),
        productId: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        sizeMl: z
          .union([
            z.lazy(() => EnumSizeMlFilterSchema),
            z.lazy(() => SizeMlSchema),
          ])
          .optional(),
        sellingPrice: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([
                z.number(),
                z.string(),
                z.instanceof(PrismaDecimal),
                DecimalJsLikeSchema,
              ])
              .refine((v) => isValidDecimalInput(v), {
                message: 'Must be a Decimal',
              }),
          ])
          .optional(),
        costPrice: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([
                z.number(),
                z.string(),
                z.instanceof(PrismaDecimal),
                DecimalJsLikeSchema,
              ])
              .refine((v) => isValidDecimalInput(v), {
                message: 'Must be a Decimal',
              }),
          ])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        comboItem: z.lazy(() => ComboItemListRelationFilterSchema).optional(),
        stock: z
          .union([
            z.lazy(() => StockNullableScalarRelationFilterSchema),
            z.lazy(() => StockWhereInputSchema),
          ])
          .optional()
          .nullable(),
        product: z
          .union([
            z.lazy(() => ProductScalarRelationFilterSchema),
            z.lazy(() => ProductWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const VariantOrderByWithAggregationInputSchema: z.ZodType<Prisma.VariantOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    sizeMl: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    costPrice: z.lazy(() => SortOrderSchema).optional(),
    sku: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => VariantCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => VariantAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => VariantMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => VariantMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => VariantSumOrderByAggregateInputSchema).optional(),
  });

export const VariantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VariantScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VariantScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VariantScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VariantScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VariantScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VariantScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    productId: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    sizeMl: z
      .union([
        z.lazy(() => EnumSizeMlWithAggregatesFilterSchema),
        z.lazy(() => SizeMlSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z.lazy(() => DecimalWithAggregatesFilterSchema),
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
      ])
      .optional(),
    costPrice: z
      .union([
        z.lazy(() => DecimalWithAggregatesFilterSchema),
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
      ])
      .optional(),
    sku: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const StockWhereInputSchema: z.ZodType<Prisma.StockWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => StockWhereInputSchema),
        z.lazy(() => StockWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => StockWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => StockWhereInputSchema),
        z.lazy(() => StockWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    variantId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    variant: z
      .union([
        z.lazy(() => VariantScalarRelationFilterSchema),
        z.lazy(() => VariantWhereInputSchema),
      ])
      .optional(),
  });

export const StockOrderByWithRelationInputSchema: z.ZodType<Prisma.StockOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
    variant: z.lazy(() => VariantOrderByWithRelationInputSchema).optional(),
  });

export const StockWhereUniqueInputSchema: z.ZodType<Prisma.StockWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        variantId: z.number().int(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        variantId: z.number().int(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.number().int().optional(),
        variantId: z.number().int().optional(),
        AND: z
          .union([
            z.lazy(() => StockWhereInputSchema),
            z.lazy(() => StockWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => StockWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => StockWhereInputSchema),
            z.lazy(() => StockWhereInputSchema).array(),
          ])
          .optional(),
        quantity: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        variant: z
          .union([
            z.lazy(() => VariantScalarRelationFilterSchema),
            z.lazy(() => VariantWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const StockOrderByWithAggregationInputSchema: z.ZodType<Prisma.StockOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => StockCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => StockAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => StockMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => StockMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => StockSumOrderByAggregateInputSchema).optional(),
  });

export const StockScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StockScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => StockScalarWhereWithAggregatesInputSchema),
        z.lazy(() => StockScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => StockScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => StockScalarWhereWithAggregatesInputSchema),
        z.lazy(() => StockScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    variantId: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    quantity: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
  });

export const ComboWhereInputSchema: z.ZodType<Prisma.ComboWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ComboWhereInputSchema),
        z.lazy(() => ComboWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ComboWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ComboWhereInputSchema),
        z.lazy(() => ComboWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    sellingPrice: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
      ])
      .optional(),
    stockQuantity: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    comboItems: z.lazy(() => ComboItemListRelationFilterSchema).optional(),
  });

export const ComboOrderByWithRelationInputSchema: z.ZodType<Prisma.ComboOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    stockQuantity: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    comboItems: z
      .lazy(() => ComboItemOrderByRelationAggregateInputSchema)
      .optional(),
  });

export const ComboWhereUniqueInputSchema: z.ZodType<Prisma.ComboWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z.strictObject({
        id: z.number().int().optional(),
        AND: z
          .union([
            z.lazy(() => ComboWhereInputSchema),
            z.lazy(() => ComboWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => ComboWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => ComboWhereInputSchema),
            z.lazy(() => ComboWhereInputSchema).array(),
          ])
          .optional(),
        name: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        image: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        sellingPrice: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([
                z.number(),
                z.string(),
                z.instanceof(PrismaDecimal),
                DecimalJsLikeSchema,
              ])
              .refine((v) => isValidDecimalInput(v), {
                message: 'Must be a Decimal',
              }),
          ])
          .optional(),
        stockQuantity: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        isActive: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        comboItems: z.lazy(() => ComboItemListRelationFilterSchema).optional(),
      }),
    );

export const ComboOrderByWithAggregationInputSchema: z.ZodType<Prisma.ComboOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    stockQuantity: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ComboCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => ComboAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ComboMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ComboMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => ComboSumOrderByAggregateInputSchema).optional(),
  });

export const ComboScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ComboScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ComboScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ComboScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ComboScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ComboScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ComboScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    image: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    sellingPrice: z
      .union([
        z.lazy(() => DecimalWithAggregatesFilterSchema),
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
      ])
      .optional(),
    stockQuantity: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    isActive: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  });

export const ComboItemWhereInputSchema: z.ZodType<Prisma.ComboItemWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ComboItemWhereInputSchema),
        z.lazy(() => ComboItemWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ComboItemWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ComboItemWhereInputSchema),
        z.lazy(() => ComboItemWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    variantId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    comboId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    combo: z
      .union([
        z.lazy(() => ComboScalarRelationFilterSchema),
        z.lazy(() => ComboWhereInputSchema),
      ])
      .optional(),
    variant: z
      .union([
        z.lazy(() => VariantScalarRelationFilterSchema),
        z.lazy(() => VariantWhereInputSchema),
      ])
      .optional(),
  });

export const ComboItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ComboItemOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    comboId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
    combo: z.lazy(() => ComboOrderByWithRelationInputSchema).optional(),
    variant: z.lazy(() => VariantOrderByWithRelationInputSchema).optional(),
  });

export const ComboItemWhereUniqueInputSchema: z.ZodType<Prisma.ComboItemWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z.strictObject({
        id: z.number().int().optional(),
        AND: z
          .union([
            z.lazy(() => ComboItemWhereInputSchema),
            z.lazy(() => ComboItemWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => ComboItemWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => ComboItemWhereInputSchema),
            z.lazy(() => ComboItemWhereInputSchema).array(),
          ])
          .optional(),
        variantId: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        comboId: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        quantity: z
          .union([z.lazy(() => IntFilterSchema), z.number().int()])
          .optional(),
        combo: z
          .union([
            z.lazy(() => ComboScalarRelationFilterSchema),
            z.lazy(() => ComboWhereInputSchema),
          ])
          .optional(),
        variant: z
          .union([
            z.lazy(() => VariantScalarRelationFilterSchema),
            z.lazy(() => VariantWhereInputSchema),
          ])
          .optional(),
      }),
    );

export const ComboItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ComboItemOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    comboId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ComboItemCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => ComboItemAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ComboItemMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ComboItemMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => ComboItemSumOrderByAggregateInputSchema).optional(),
  });

export const ComboItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ComboItemScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ComboItemScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ComboItemScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ComboItemScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ComboItemScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ComboItemScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    variantId: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    comboId: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
    quantity: z
      .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
      .optional(),
  });

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
  });

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
  });

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  });

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  });

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  });

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    userId: z.string(),
  });

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema)
      .optional(),
  });

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    userId: z.string(),
  });

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  });

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  });

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
  });

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    userId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema)
      .optional(),
  });

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    userId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> =
  z.strictObject({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> =
  z.strictObject({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    identifier: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    identifier: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> =
  z.strictObject({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    identifier: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    identifier: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> =
  z.strictObject({
    name: z.string(),
    image: z.string().optional().nullable(),
    rating: z.number().int().optional(),
    sex: z.lazy(() => SexSchema),
    concentration: z.lazy(() => ConcentrationSchema),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    variants: z
      .lazy(() => VariantCreateNestedManyWithoutProductInputSchema)
      .optional(),
  });

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> =
  z.strictObject({
    id: z.number().int().optional(),
    name: z.string(),
    image: z.string().optional().nullable(),
    rating: z.number().int().optional(),
    sex: z.lazy(() => SexSchema),
    concentration: z.lazy(() => ConcentrationSchema),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    variants: z
      .lazy(() => VariantUncheckedCreateNestedManyWithoutProductInputSchema)
      .optional(),
  });

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> =
  z.strictObject({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rating: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sex: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => EnumSexFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    concentration: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => EnumConcentrationFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variants: z
      .lazy(() => VariantUpdateManyWithoutProductNestedInputSchema)
      .optional(),
  });

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rating: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sex: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => EnumSexFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    concentration: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => EnumConcentrationFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variants: z
      .lazy(() => VariantUncheckedUpdateManyWithoutProductNestedInputSchema)
      .optional(),
  });

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> =
  z.strictObject({
    id: z.number().int().optional(),
    name: z.string(),
    image: z.string().optional().nullable(),
    rating: z.number().int().optional(),
    sex: z.lazy(() => SexSchema),
    concentration: z.lazy(() => ConcentrationSchema),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> =
  z.strictObject({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rating: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sex: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => EnumSexFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    concentration: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => EnumConcentrationFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rating: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sex: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => EnumSexFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    concentration: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => EnumConcentrationFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VariantCreateInputSchema: z.ZodType<Prisma.VariantCreateInput> =
  z.strictObject({
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    comboItem: z
      .lazy(() => ComboItemCreateNestedManyWithoutVariantInputSchema)
      .optional(),
    stock: z
      .lazy(() => StockCreateNestedOneWithoutVariantInputSchema)
      .optional(),
    product: z.lazy(() => ProductCreateNestedOneWithoutVariantsInputSchema),
  });

export const VariantUncheckedCreateInputSchema: z.ZodType<Prisma.VariantUncheckedCreateInput> =
  z.strictObject({
    id: z.number().int().optional(),
    productId: z.number().int(),
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    comboItem: z
      .lazy(() => ComboItemUncheckedCreateNestedManyWithoutVariantInputSchema)
      .optional(),
    stock: z
      .lazy(() => StockUncheckedCreateNestedOneWithoutVariantInputSchema)
      .optional(),
  });

export const VariantUpdateInputSchema: z.ZodType<Prisma.VariantUpdateInput> =
  z.strictObject({
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboItem: z
      .lazy(() => ComboItemUpdateManyWithoutVariantNestedInputSchema)
      .optional(),
    stock: z
      .lazy(() => StockUpdateOneWithoutVariantNestedInputSchema)
      .optional(),
    product: z
      .lazy(() => ProductUpdateOneRequiredWithoutVariantsNestedInputSchema)
      .optional(),
  });

export const VariantUncheckedUpdateInputSchema: z.ZodType<Prisma.VariantUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    productId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboItem: z
      .lazy(() => ComboItemUncheckedUpdateManyWithoutVariantNestedInputSchema)
      .optional(),
    stock: z
      .lazy(() => StockUncheckedUpdateOneWithoutVariantNestedInputSchema)
      .optional(),
  });

export const VariantCreateManyInputSchema: z.ZodType<Prisma.VariantCreateManyInput> =
  z.strictObject({
    id: z.number().int().optional(),
    productId: z.number().int(),
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const VariantUpdateManyMutationInputSchema: z.ZodType<Prisma.VariantUpdateManyMutationInput> =
  z.strictObject({
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VariantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VariantUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    productId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const StockCreateInputSchema: z.ZodType<Prisma.StockCreateInput> =
  z.strictObject({
    quantity: z.number().int().optional(),
    variant: z.lazy(() => VariantCreateNestedOneWithoutStockInputSchema),
  });

export const StockUncheckedCreateInputSchema: z.ZodType<Prisma.StockUncheckedCreateInput> =
  z.strictObject({
    id: z.number().int().optional(),
    variantId: z.number().int(),
    quantity: z.number().int().optional(),
  });

export const StockUpdateInputSchema: z.ZodType<Prisma.StockUpdateInput> =
  z.strictObject({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variant: z
      .lazy(() => VariantUpdateOneRequiredWithoutStockNestedInputSchema)
      .optional(),
  });

export const StockUncheckedUpdateInputSchema: z.ZodType<Prisma.StockUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variantId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const StockCreateManyInputSchema: z.ZodType<Prisma.StockCreateManyInput> =
  z.strictObject({
    id: z.number().int().optional(),
    variantId: z.number().int(),
    quantity: z.number().int().optional(),
  });

export const StockUpdateManyMutationInputSchema: z.ZodType<Prisma.StockUpdateManyMutationInput> =
  z.strictObject({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const StockUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StockUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variantId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboCreateInputSchema: z.ZodType<Prisma.ComboCreateInput> =
  z.strictObject({
    name: z.string(),
    image: z.string().optional().nullable(),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    stockQuantity: z.number().int().optional(),
    isActive: z.boolean(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    comboItems: z
      .lazy(() => ComboItemCreateNestedManyWithoutComboInputSchema)
      .optional(),
  });

export const ComboUncheckedCreateInputSchema: z.ZodType<Prisma.ComboUncheckedCreateInput> =
  z.strictObject({
    id: z.number().int().optional(),
    name: z.string(),
    image: z.string().optional().nullable(),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    stockQuantity: z.number().int().optional(),
    isActive: z.boolean(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    comboItems: z
      .lazy(() => ComboItemUncheckedCreateNestedManyWithoutComboInputSchema)
      .optional(),
  });

export const ComboUpdateInputSchema: z.ZodType<Prisma.ComboUpdateInput> =
  z.strictObject({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stockQuantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboItems: z
      .lazy(() => ComboItemUpdateManyWithoutComboNestedInputSchema)
      .optional(),
  });

export const ComboUncheckedUpdateInputSchema: z.ZodType<Prisma.ComboUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stockQuantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboItems: z
      .lazy(() => ComboItemUncheckedUpdateManyWithoutComboNestedInputSchema)
      .optional(),
  });

export const ComboCreateManyInputSchema: z.ZodType<Prisma.ComboCreateManyInput> =
  z.strictObject({
    id: z.number().int().optional(),
    name: z.string(),
    image: z.string().optional().nullable(),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    stockQuantity: z.number().int().optional(),
    isActive: z.boolean(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const ComboUpdateManyMutationInputSchema: z.ZodType<Prisma.ComboUpdateManyMutationInput> =
  z.strictObject({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stockQuantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ComboUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stockQuantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboItemCreateInputSchema: z.ZodType<Prisma.ComboItemCreateInput> =
  z.strictObject({
    quantity: z.number().int(),
    combo: z.lazy(() => ComboCreateNestedOneWithoutComboItemsInputSchema),
    variant: z.lazy(() => VariantCreateNestedOneWithoutComboItemInputSchema),
  });

export const ComboItemUncheckedCreateInputSchema: z.ZodType<Prisma.ComboItemUncheckedCreateInput> =
  z.strictObject({
    id: z.number().int().optional(),
    variantId: z.number().int(),
    comboId: z.number().int(),
    quantity: z.number().int(),
  });

export const ComboItemUpdateInputSchema: z.ZodType<Prisma.ComboItemUpdateInput> =
  z.strictObject({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    combo: z
      .lazy(() => ComboUpdateOneRequiredWithoutComboItemsNestedInputSchema)
      .optional(),
    variant: z
      .lazy(() => VariantUpdateOneRequiredWithoutComboItemNestedInputSchema)
      .optional(),
  });

export const ComboItemUncheckedUpdateInputSchema: z.ZodType<Prisma.ComboItemUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variantId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboItemCreateManyInputSchema: z.ZodType<Prisma.ComboItemCreateManyInput> =
  z.strictObject({
    id: z.number().int().optional(),
    variantId: z.number().int(),
    comboId: z.number().int(),
    quantity: z.number().int(),
  });

export const ComboItemUpdateManyMutationInputSchema: z.ZodType<Prisma.ComboItemUpdateManyMutationInput> =
  z.strictObject({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ComboItemUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variantId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  });

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  });

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => SessionWhereInputSchema).optional(),
    some: z.lazy(() => SessionWhereInputSchema).optional(),
    none: z.lazy(() => SessionWhereInputSchema).optional(),
  });

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => AccountWhereInputSchema).optional(),
    some: z.lazy(() => AccountWhereInputSchema).optional(),
    none: z.lazy(() => AccountWhereInputSchema).optional(),
  });

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> =
  z.strictObject({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  });

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  });

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  });

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  });

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  });

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  });

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  });

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  });

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
});

export const EnumSexFilterSchema: z.ZodType<Prisma.EnumSexFilter> =
  z.strictObject({
    equals: z.lazy(() => SexSchema).optional(),
    in: z
      .lazy(() => SexSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SexSchema)
      .array()
      .optional(),
    not: z
      .union([z.lazy(() => SexSchema), z.lazy(() => NestedEnumSexFilterSchema)])
      .optional(),
  });

export const EnumConcentrationFilterSchema: z.ZodType<Prisma.EnumConcentrationFilter> =
  z.strictObject({
    equals: z.lazy(() => ConcentrationSchema).optional(),
    in: z
      .lazy(() => ConcentrationSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => ConcentrationSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => NestedEnumConcentrationFilterSchema),
      ])
      .optional(),
  });

export const VariantListRelationFilterSchema: z.ZodType<Prisma.VariantListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => VariantWhereInputSchema).optional(),
    some: z.lazy(() => VariantWhereInputSchema).optional(),
    none: z.lazy(() => VariantWhereInputSchema).optional(),
  });

export const VariantOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VariantOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
    sex: z.lazy(() => SortOrderSchema).optional(),
    concentration: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const ProductAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
  });

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
    sex: z.lazy(() => SortOrderSchema).optional(),
    concentration: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
    sex: z.lazy(() => SortOrderSchema).optional(),
    concentration: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const ProductSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
  });

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  });

export const EnumSexWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSexWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => SexSchema).optional(),
    in: z
      .lazy(() => SexSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SexSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => NestedEnumSexWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumSexFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumSexFilterSchema).optional(),
  });

export const EnumConcentrationWithAggregatesFilterSchema: z.ZodType<Prisma.EnumConcentrationWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => ConcentrationSchema).optional(),
    in: z
      .lazy(() => ConcentrationSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => ConcentrationSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => NestedEnumConcentrationWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumConcentrationFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumConcentrationFilterSchema).optional(),
  });

export const EnumSizeMlFilterSchema: z.ZodType<Prisma.EnumSizeMlFilter> =
  z.strictObject({
    equals: z.lazy(() => SizeMlSchema).optional(),
    in: z
      .lazy(() => SizeMlSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SizeMlSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => NestedEnumSizeMlFilterSchema),
      ])
      .optional(),
  });

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> =
  z.strictObject({
    equals: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(PrismaDecimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine(
        (v) =>
          Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
        { message: 'Must be a Decimal' },
      )
      .optional(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(PrismaDecimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine(
        (v) =>
          Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
        { message: 'Must be a Decimal' },
      )
      .optional(),
    lt: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => NestedDecimalFilterSchema),
      ])
      .optional(),
  });

export const ComboItemListRelationFilterSchema: z.ZodType<Prisma.ComboItemListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => ComboItemWhereInputSchema).optional(),
    some: z.lazy(() => ComboItemWhereInputSchema).optional(),
    none: z.lazy(() => ComboItemWhereInputSchema).optional(),
  });

export const StockNullableScalarRelationFilterSchema: z.ZodType<Prisma.StockNullableScalarRelationFilter> =
  z.strictObject({
    is: z
      .lazy(() => StockWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => StockWhereInputSchema)
      .optional()
      .nullable(),
  });

export const ProductScalarRelationFilterSchema: z.ZodType<Prisma.ProductScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => ProductWhereInputSchema).optional(),
    isNot: z.lazy(() => ProductWhereInputSchema).optional(),
  });

export const ComboItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ComboItemOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  });

export const VariantCountOrderByAggregateInputSchema: z.ZodType<Prisma.VariantCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    sizeMl: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    costPrice: z.lazy(() => SortOrderSchema).optional(),
    sku: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const VariantAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VariantAvgOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    costPrice: z.lazy(() => SortOrderSchema).optional(),
  });

export const VariantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VariantMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    sizeMl: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    costPrice: z.lazy(() => SortOrderSchema).optional(),
    sku: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const VariantMinOrderByAggregateInputSchema: z.ZodType<Prisma.VariantMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    sizeMl: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    costPrice: z.lazy(() => SortOrderSchema).optional(),
    sku: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const VariantSumOrderByAggregateInputSchema: z.ZodType<Prisma.VariantSumOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    costPrice: z.lazy(() => SortOrderSchema).optional(),
  });

export const EnumSizeMlWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSizeMlWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => SizeMlSchema).optional(),
    in: z
      .lazy(() => SizeMlSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SizeMlSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => NestedEnumSizeMlWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumSizeMlFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumSizeMlFilterSchema).optional(),
  });

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> =
  z.strictObject({
    equals: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(PrismaDecimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine(
        (v) =>
          Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
        { message: 'Must be a Decimal' },
      )
      .optional(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(PrismaDecimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine(
        (v) =>
          Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
        { message: 'Must be a Decimal' },
      )
      .optional(),
    lt: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => NestedDecimalWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
  });

export const VariantScalarRelationFilterSchema: z.ZodType<Prisma.VariantScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => VariantWhereInputSchema).optional(),
    isNot: z.lazy(() => VariantWhereInputSchema).optional(),
  });

export const StockCountOrderByAggregateInputSchema: z.ZodType<Prisma.StockCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const StockAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StockAvgOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const StockMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StockMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const StockMinOrderByAggregateInputSchema: z.ZodType<Prisma.StockMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const StockSumOrderByAggregateInputSchema: z.ZodType<Prisma.StockSumOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboCountOrderByAggregateInputSchema: z.ZodType<Prisma.ComboCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    stockQuantity: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ComboAvgOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    stockQuantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ComboMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    stockQuantity: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboMinOrderByAggregateInputSchema: z.ZodType<Prisma.ComboMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    stockQuantity: z.lazy(() => SortOrderSchema).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboSumOrderByAggregateInputSchema: z.ZodType<Prisma.ComboSumOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    sellingPrice: z.lazy(() => SortOrderSchema).optional(),
    stockQuantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboScalarRelationFilterSchema: z.ZodType<Prisma.ComboScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => ComboWhereInputSchema).optional(),
    isNot: z.lazy(() => ComboWhereInputSchema).optional(),
  });

export const ComboItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.ComboItemCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    comboId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ComboItemAvgOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    comboId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ComboItemMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    comboId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.ComboItemMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    comboId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const ComboItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.ComboItemSumOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    variantId: z.lazy(() => SortOrderSchema).optional(),
    comboId: z.lazy(() => SortOrderSchema).optional(),
    quantity: z.lazy(() => SortOrderSchema).optional(),
  });

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional(),
  });

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.boolean().optional(),
  });

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional().nullable(),
  });

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.coerce.date().optional(),
  });

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => SessionScalarWhereInputSchema),
        z.lazy(() => SessionScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => SessionScalarWhereInputSchema),
        z.lazy(() => SessionScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  });

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ])
      .optional(),
  });

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  });

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.coerce.date().optional().nullable(),
  });

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ])
      .optional(),
  });

export const VariantCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.VariantCreateNestedManyWithoutProductInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VariantCreateWithoutProductInputSchema),
        z.lazy(() => VariantCreateWithoutProductInputSchema).array(),
        z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema),
        z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VariantCreateOrConnectWithoutProductInputSchema),
        z.lazy(() => VariantCreateOrConnectWithoutProductInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VariantCreateManyProductInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const VariantUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.VariantUncheckedCreateNestedManyWithoutProductInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VariantCreateWithoutProductInputSchema),
        z.lazy(() => VariantCreateWithoutProductInputSchema).array(),
        z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema),
        z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VariantCreateOrConnectWithoutProductInputSchema),
        z.lazy(() => VariantCreateOrConnectWithoutProductInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VariantCreateManyProductInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  });

export const EnumSexFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSexFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => SexSchema).optional(),
  });

export const EnumConcentrationFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumConcentrationFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => ConcentrationSchema).optional(),
  });

export const VariantUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.VariantUpdateManyWithoutProductNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VariantCreateWithoutProductInputSchema),
        z.lazy(() => VariantCreateWithoutProductInputSchema).array(),
        z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema),
        z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VariantCreateOrConnectWithoutProductInputSchema),
        z.lazy(() => VariantCreateOrConnectWithoutProductInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => VariantUpsertWithWhereUniqueWithoutProductInputSchema),
        z
          .lazy(() => VariantUpsertWithWhereUniqueWithoutProductInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VariantCreateManyProductInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => VariantUpdateWithWhereUniqueWithoutProductInputSchema),
        z
          .lazy(() => VariantUpdateWithWhereUniqueWithoutProductInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => VariantUpdateManyWithWhereWithoutProductInputSchema),
        z
          .lazy(() => VariantUpdateManyWithWhereWithoutProductInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VariantScalarWhereInputSchema),
        z.lazy(() => VariantScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const VariantUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.VariantUncheckedUpdateManyWithoutProductNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VariantCreateWithoutProductInputSchema),
        z.lazy(() => VariantCreateWithoutProductInputSchema).array(),
        z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema),
        z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => VariantCreateOrConnectWithoutProductInputSchema),
        z.lazy(() => VariantCreateOrConnectWithoutProductInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => VariantUpsertWithWhereUniqueWithoutProductInputSchema),
        z
          .lazy(() => VariantUpsertWithWhereUniqueWithoutProductInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => VariantCreateManyProductInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => VariantWhereUniqueInputSchema),
        z.lazy(() => VariantWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => VariantUpdateWithWhereUniqueWithoutProductInputSchema),
        z
          .lazy(() => VariantUpdateWithWhereUniqueWithoutProductInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => VariantUpdateManyWithWhereWithoutProductInputSchema),
        z
          .lazy(() => VariantUpdateManyWithWhereWithoutProductInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => VariantScalarWhereInputSchema),
        z.lazy(() => VariantScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const ComboItemCreateNestedManyWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemCreateNestedManyWithoutVariantInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboItemCreateWithoutVariantInputSchema),
        z.lazy(() => ComboItemCreateWithoutVariantInputSchema).array(),
        z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema),
        z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ComboItemCreateOrConnectWithoutVariantInputSchema),
        z.lazy(() => ComboItemCreateOrConnectWithoutVariantInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ComboItemCreateManyVariantInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const StockCreateNestedOneWithoutVariantInputSchema: z.ZodType<Prisma.StockCreateNestedOneWithoutVariantInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => StockCreateWithoutVariantInputSchema),
        z.lazy(() => StockUncheckedCreateWithoutVariantInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => StockCreateOrConnectWithoutVariantInputSchema)
      .optional(),
    connect: z.lazy(() => StockWhereUniqueInputSchema).optional(),
  });

export const ProductCreateNestedOneWithoutVariantsInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutVariantsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ProductCreateWithoutVariantsInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutVariantsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProductCreateOrConnectWithoutVariantsInputSchema)
      .optional(),
    connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  });

export const ComboItemUncheckedCreateNestedManyWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemUncheckedCreateNestedManyWithoutVariantInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboItemCreateWithoutVariantInputSchema),
        z.lazy(() => ComboItemCreateWithoutVariantInputSchema).array(),
        z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema),
        z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ComboItemCreateOrConnectWithoutVariantInputSchema),
        z.lazy(() => ComboItemCreateOrConnectWithoutVariantInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ComboItemCreateManyVariantInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const StockUncheckedCreateNestedOneWithoutVariantInputSchema: z.ZodType<Prisma.StockUncheckedCreateNestedOneWithoutVariantInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => StockCreateWithoutVariantInputSchema),
        z.lazy(() => StockUncheckedCreateWithoutVariantInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => StockCreateOrConnectWithoutVariantInputSchema)
      .optional(),
    connect: z.lazy(() => StockWhereUniqueInputSchema).optional(),
  });

export const EnumSizeMlFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSizeMlFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.lazy(() => SizeMlSchema).optional(),
  });

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> =
  z.strictObject({
    set: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    increment: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    decrement: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    multiply: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    divide: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
  });

export const ComboItemUpdateManyWithoutVariantNestedInputSchema: z.ZodType<Prisma.ComboItemUpdateManyWithoutVariantNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboItemCreateWithoutVariantInputSchema),
        z.lazy(() => ComboItemCreateWithoutVariantInputSchema).array(),
        z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema),
        z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ComboItemCreateOrConnectWithoutVariantInputSchema),
        z.lazy(() => ComboItemCreateOrConnectWithoutVariantInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ComboItemUpsertWithWhereUniqueWithoutVariantInputSchema),
        z
          .lazy(() => ComboItemUpsertWithWhereUniqueWithoutVariantInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ComboItemCreateManyVariantInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ComboItemUpdateWithWhereUniqueWithoutVariantInputSchema),
        z
          .lazy(() => ComboItemUpdateWithWhereUniqueWithoutVariantInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ComboItemUpdateManyWithWhereWithoutVariantInputSchema),
        z
          .lazy(() => ComboItemUpdateManyWithWhereWithoutVariantInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ComboItemScalarWhereInputSchema),
        z.lazy(() => ComboItemScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const StockUpdateOneWithoutVariantNestedInputSchema: z.ZodType<Prisma.StockUpdateOneWithoutVariantNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => StockCreateWithoutVariantInputSchema),
        z.lazy(() => StockUncheckedCreateWithoutVariantInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => StockCreateOrConnectWithoutVariantInputSchema)
      .optional(),
    upsert: z.lazy(() => StockUpsertWithoutVariantInputSchema).optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => StockWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => StockWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => StockWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => StockUpdateToOneWithWhereWithoutVariantInputSchema),
        z.lazy(() => StockUpdateWithoutVariantInputSchema),
        z.lazy(() => StockUncheckedUpdateWithoutVariantInputSchema),
      ])
      .optional(),
  });

export const ProductUpdateOneRequiredWithoutVariantsNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutVariantsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ProductCreateWithoutVariantsInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutVariantsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProductCreateOrConnectWithoutVariantsInputSchema)
      .optional(),
    upsert: z.lazy(() => ProductUpsertWithoutVariantsInputSchema).optional(),
    connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => ProductUpdateToOneWithWhereWithoutVariantsInputSchema),
        z.lazy(() => ProductUpdateWithoutVariantsInputSchema),
        z.lazy(() => ProductUncheckedUpdateWithoutVariantsInputSchema),
      ])
      .optional(),
  });

export const ComboItemUncheckedUpdateManyWithoutVariantNestedInputSchema: z.ZodType<Prisma.ComboItemUncheckedUpdateManyWithoutVariantNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboItemCreateWithoutVariantInputSchema),
        z.lazy(() => ComboItemCreateWithoutVariantInputSchema).array(),
        z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema),
        z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ComboItemCreateOrConnectWithoutVariantInputSchema),
        z.lazy(() => ComboItemCreateOrConnectWithoutVariantInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ComboItemUpsertWithWhereUniqueWithoutVariantInputSchema),
        z
          .lazy(() => ComboItemUpsertWithWhereUniqueWithoutVariantInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ComboItemCreateManyVariantInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ComboItemUpdateWithWhereUniqueWithoutVariantInputSchema),
        z
          .lazy(() => ComboItemUpdateWithWhereUniqueWithoutVariantInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ComboItemUpdateManyWithWhereWithoutVariantInputSchema),
        z
          .lazy(() => ComboItemUpdateManyWithWhereWithoutVariantInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ComboItemScalarWhereInputSchema),
        z.lazy(() => ComboItemScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const StockUncheckedUpdateOneWithoutVariantNestedInputSchema: z.ZodType<Prisma.StockUncheckedUpdateOneWithoutVariantNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => StockCreateWithoutVariantInputSchema),
        z.lazy(() => StockUncheckedCreateWithoutVariantInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => StockCreateOrConnectWithoutVariantInputSchema)
      .optional(),
    upsert: z.lazy(() => StockUpsertWithoutVariantInputSchema).optional(),
    disconnect: z
      .union([z.boolean(), z.lazy(() => StockWhereInputSchema)])
      .optional(),
    delete: z
      .union([z.boolean(), z.lazy(() => StockWhereInputSchema)])
      .optional(),
    connect: z.lazy(() => StockWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => StockUpdateToOneWithWhereWithoutVariantInputSchema),
        z.lazy(() => StockUpdateWithoutVariantInputSchema),
        z.lazy(() => StockUncheckedUpdateWithoutVariantInputSchema),
      ])
      .optional(),
  });

export const VariantCreateNestedOneWithoutStockInputSchema: z.ZodType<Prisma.VariantCreateNestedOneWithoutStockInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VariantCreateWithoutStockInputSchema),
        z.lazy(() => VariantUncheckedCreateWithoutStockInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VariantCreateOrConnectWithoutStockInputSchema)
      .optional(),
    connect: z.lazy(() => VariantWhereUniqueInputSchema).optional(),
  });

export const VariantUpdateOneRequiredWithoutStockNestedInputSchema: z.ZodType<Prisma.VariantUpdateOneRequiredWithoutStockNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VariantCreateWithoutStockInputSchema),
        z.lazy(() => VariantUncheckedCreateWithoutStockInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VariantCreateOrConnectWithoutStockInputSchema)
      .optional(),
    upsert: z.lazy(() => VariantUpsertWithoutStockInputSchema).optional(),
    connect: z.lazy(() => VariantWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => VariantUpdateToOneWithWhereWithoutStockInputSchema),
        z.lazy(() => VariantUpdateWithoutStockInputSchema),
        z.lazy(() => VariantUncheckedUpdateWithoutStockInputSchema),
      ])
      .optional(),
  });

export const ComboItemCreateNestedManyWithoutComboInputSchema: z.ZodType<Prisma.ComboItemCreateNestedManyWithoutComboInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboItemCreateWithoutComboInputSchema),
        z.lazy(() => ComboItemCreateWithoutComboInputSchema).array(),
        z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema),
        z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ComboItemCreateOrConnectWithoutComboInputSchema),
        z.lazy(() => ComboItemCreateOrConnectWithoutComboInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ComboItemCreateManyComboInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const ComboItemUncheckedCreateNestedManyWithoutComboInputSchema: z.ZodType<Prisma.ComboItemUncheckedCreateNestedManyWithoutComboInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboItemCreateWithoutComboInputSchema),
        z.lazy(() => ComboItemCreateWithoutComboInputSchema).array(),
        z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema),
        z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ComboItemCreateOrConnectWithoutComboInputSchema),
        z.lazy(() => ComboItemCreateOrConnectWithoutComboInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ComboItemCreateManyComboInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
  });

export const ComboItemUpdateManyWithoutComboNestedInputSchema: z.ZodType<Prisma.ComboItemUpdateManyWithoutComboNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboItemCreateWithoutComboInputSchema),
        z.lazy(() => ComboItemCreateWithoutComboInputSchema).array(),
        z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema),
        z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ComboItemCreateOrConnectWithoutComboInputSchema),
        z.lazy(() => ComboItemCreateOrConnectWithoutComboInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ComboItemUpsertWithWhereUniqueWithoutComboInputSchema),
        z
          .lazy(() => ComboItemUpsertWithWhereUniqueWithoutComboInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ComboItemCreateManyComboInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ComboItemUpdateWithWhereUniqueWithoutComboInputSchema),
        z
          .lazy(() => ComboItemUpdateWithWhereUniqueWithoutComboInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ComboItemUpdateManyWithWhereWithoutComboInputSchema),
        z
          .lazy(() => ComboItemUpdateManyWithWhereWithoutComboInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ComboItemScalarWhereInputSchema),
        z.lazy(() => ComboItemScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const ComboItemUncheckedUpdateManyWithoutComboNestedInputSchema: z.ZodType<Prisma.ComboItemUncheckedUpdateManyWithoutComboNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboItemCreateWithoutComboInputSchema),
        z.lazy(() => ComboItemCreateWithoutComboInputSchema).array(),
        z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema),
        z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ComboItemCreateOrConnectWithoutComboInputSchema),
        z.lazy(() => ComboItemCreateOrConnectWithoutComboInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ComboItemUpsertWithWhereUniqueWithoutComboInputSchema),
        z
          .lazy(() => ComboItemUpsertWithWhereUniqueWithoutComboInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ComboItemCreateManyComboInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ComboItemWhereUniqueInputSchema),
        z.lazy(() => ComboItemWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ComboItemUpdateWithWhereUniqueWithoutComboInputSchema),
        z
          .lazy(() => ComboItemUpdateWithWhereUniqueWithoutComboInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ComboItemUpdateManyWithWhereWithoutComboInputSchema),
        z
          .lazy(() => ComboItemUpdateManyWithWhereWithoutComboInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ComboItemScalarWhereInputSchema),
        z.lazy(() => ComboItemScalarWhereInputSchema).array(),
      ])
      .optional(),
  });

export const ComboCreateNestedOneWithoutComboItemsInputSchema: z.ZodType<Prisma.ComboCreateNestedOneWithoutComboItemsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboCreateWithoutComboItemsInputSchema),
        z.lazy(() => ComboUncheckedCreateWithoutComboItemsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ComboCreateOrConnectWithoutComboItemsInputSchema)
      .optional(),
    connect: z.lazy(() => ComboWhereUniqueInputSchema).optional(),
  });

export const VariantCreateNestedOneWithoutComboItemInputSchema: z.ZodType<Prisma.VariantCreateNestedOneWithoutComboItemInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VariantCreateWithoutComboItemInputSchema),
        z.lazy(() => VariantUncheckedCreateWithoutComboItemInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VariantCreateOrConnectWithoutComboItemInputSchema)
      .optional(),
    connect: z.lazy(() => VariantWhereUniqueInputSchema).optional(),
  });

export const ComboUpdateOneRequiredWithoutComboItemsNestedInputSchema: z.ZodType<Prisma.ComboUpdateOneRequiredWithoutComboItemsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ComboCreateWithoutComboItemsInputSchema),
        z.lazy(() => ComboUncheckedCreateWithoutComboItemsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ComboCreateOrConnectWithoutComboItemsInputSchema)
      .optional(),
    upsert: z.lazy(() => ComboUpsertWithoutComboItemsInputSchema).optional(),
    connect: z.lazy(() => ComboWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => ComboUpdateToOneWithWhereWithoutComboItemsInputSchema),
        z.lazy(() => ComboUpdateWithoutComboItemsInputSchema),
        z.lazy(() => ComboUncheckedUpdateWithoutComboItemsInputSchema),
      ])
      .optional(),
  });

export const VariantUpdateOneRequiredWithoutComboItemNestedInputSchema: z.ZodType<Prisma.VariantUpdateOneRequiredWithoutComboItemNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => VariantCreateWithoutComboItemInputSchema),
        z.lazy(() => VariantUncheckedCreateWithoutComboItemInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => VariantCreateOrConnectWithoutComboItemInputSchema)
      .optional(),
    upsert: z.lazy(() => VariantUpsertWithoutComboItemInputSchema).optional(),
    connect: z.lazy(() => VariantWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => VariantUpdateToOneWithWhereWithoutComboItemInputSchema),
        z.lazy(() => VariantUpdateWithoutComboItemInputSchema),
        z.lazy(() => VariantUncheckedUpdateWithoutComboItemInputSchema),
      ])
      .optional(),
  });

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  });

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  });

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  });

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  });

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  });

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  });

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  });

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  });

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  });

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  });

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  });

export const NestedEnumSexFilterSchema: z.ZodType<Prisma.NestedEnumSexFilter> =
  z.strictObject({
    equals: z.lazy(() => SexSchema).optional(),
    in: z
      .lazy(() => SexSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SexSchema)
      .array()
      .optional(),
    not: z
      .union([z.lazy(() => SexSchema), z.lazy(() => NestedEnumSexFilterSchema)])
      .optional(),
  });

export const NestedEnumConcentrationFilterSchema: z.ZodType<Prisma.NestedEnumConcentrationFilter> =
  z.strictObject({
    equals: z.lazy(() => ConcentrationSchema).optional(),
    in: z
      .lazy(() => ConcentrationSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => ConcentrationSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => NestedEnumConcentrationFilterSchema),
      ])
      .optional(),
  });

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  });

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  });

export const NestedEnumSexWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSexWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => SexSchema).optional(),
    in: z
      .lazy(() => SexSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SexSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => NestedEnumSexWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumSexFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumSexFilterSchema).optional(),
  });

export const NestedEnumConcentrationWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumConcentrationWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => ConcentrationSchema).optional(),
    in: z
      .lazy(() => ConcentrationSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => ConcentrationSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => NestedEnumConcentrationWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumConcentrationFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumConcentrationFilterSchema).optional(),
  });

export const NestedEnumSizeMlFilterSchema: z.ZodType<Prisma.NestedEnumSizeMlFilter> =
  z.strictObject({
    equals: z.lazy(() => SizeMlSchema).optional(),
    in: z
      .lazy(() => SizeMlSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SizeMlSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => NestedEnumSizeMlFilterSchema),
      ])
      .optional(),
  });

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> =
  z.strictObject({
    equals: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(PrismaDecimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine(
        (v) =>
          Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
        { message: 'Must be a Decimal' },
      )
      .optional(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(PrismaDecimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine(
        (v) =>
          Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
        { message: 'Must be a Decimal' },
      )
      .optional(),
    lt: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => NestedDecimalFilterSchema),
      ])
      .optional(),
  });

export const NestedEnumSizeMlWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSizeMlWithAggregatesFilter> =
  z.strictObject({
    equals: z.lazy(() => SizeMlSchema).optional(),
    in: z
      .lazy(() => SizeMlSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SizeMlSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => NestedEnumSizeMlWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumSizeMlFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumSizeMlFilterSchema).optional(),
  });

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> =
  z.strictObject({
    equals: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(PrismaDecimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine(
        (v) =>
          Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
        { message: 'Must be a Decimal' },
      )
      .optional(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(PrismaDecimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine(
        (v) =>
          Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),
        { message: 'Must be a Decimal' },
      )
      .optional(),
    lt: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => NestedDecimalWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
  });

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  });

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  });

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => SessionWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => SessionCreateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
    ]),
  });

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => SessionCreateManyUserInputSchema),
      z.lazy(() => SessionCreateManyUserInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => AccountWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => AccountCreateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
    ]),
  });

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AccountCreateManyUserInputSchema),
      z.lazy(() => AccountCreateManyUserInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => SessionWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => SessionUpdateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
    ]),
    create: z.union([
      z.lazy(() => SessionCreateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
    ]),
  });

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => SessionWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => SessionUpdateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
    ]),
  });

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => SessionScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => SessionUpdateManyMutationInputSchema),
      z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema),
    ]),
  });

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => SessionScalarWhereInputSchema),
        z.lazy(() => SessionScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionScalarWhereInputSchema),
        z.lazy(() => SessionScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    ipAddress: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  });

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => AccountWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => AccountUpdateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
    ]),
    create: z.union([
      z.lazy(() => AccountCreateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
    ]),
  });

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => AccountWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => AccountUpdateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
    ]),
  });

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => AccountScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => AccountUpdateManyMutationInputSchema),
      z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
    ]),
  });

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accessToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    idToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    password: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
  });

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
  });

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
    ]),
  });

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UserUpdateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
    ]),
  });

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  });

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  });

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
  });

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
  });

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
    ]),
  });

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  });

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
    ]),
  });

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  });

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  });

export const VariantCreateWithoutProductInputSchema: z.ZodType<Prisma.VariantCreateWithoutProductInput> =
  z.strictObject({
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    comboItem: z
      .lazy(() => ComboItemCreateNestedManyWithoutVariantInputSchema)
      .optional(),
    stock: z
      .lazy(() => StockCreateNestedOneWithoutVariantInputSchema)
      .optional(),
  });

export const VariantUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.VariantUncheckedCreateWithoutProductInput> =
  z.strictObject({
    id: z.number().int().optional(),
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    comboItem: z
      .lazy(() => ComboItemUncheckedCreateNestedManyWithoutVariantInputSchema)
      .optional(),
    stock: z
      .lazy(() => StockUncheckedCreateNestedOneWithoutVariantInputSchema)
      .optional(),
  });

export const VariantCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.VariantCreateOrConnectWithoutProductInput> =
  z.strictObject({
    where: z.lazy(() => VariantWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VariantCreateWithoutProductInputSchema),
      z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema),
    ]),
  });

export const VariantCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.VariantCreateManyProductInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => VariantCreateManyProductInputSchema),
      z.lazy(() => VariantCreateManyProductInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const VariantUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.VariantUpsertWithWhereUniqueWithoutProductInput> =
  z.strictObject({
    where: z.lazy(() => VariantWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => VariantUpdateWithoutProductInputSchema),
      z.lazy(() => VariantUncheckedUpdateWithoutProductInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VariantCreateWithoutProductInputSchema),
      z.lazy(() => VariantUncheckedCreateWithoutProductInputSchema),
    ]),
  });

export const VariantUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.VariantUpdateWithWhereUniqueWithoutProductInput> =
  z.strictObject({
    where: z.lazy(() => VariantWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => VariantUpdateWithoutProductInputSchema),
      z.lazy(() => VariantUncheckedUpdateWithoutProductInputSchema),
    ]),
  });

export const VariantUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.VariantUpdateManyWithWhereWithoutProductInput> =
  z.strictObject({
    where: z.lazy(() => VariantScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => VariantUpdateManyMutationInputSchema),
      z.lazy(() => VariantUncheckedUpdateManyWithoutProductInputSchema),
    ]),
  });

export const VariantScalarWhereInputSchema: z.ZodType<Prisma.VariantScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VariantScalarWhereInputSchema),
        z.lazy(() => VariantScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VariantScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VariantScalarWhereInputSchema),
        z.lazy(() => VariantScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    productId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    sizeMl: z
      .union([z.lazy(() => EnumSizeMlFilterSchema), z.lazy(() => SizeMlSchema)])
      .optional(),
    sellingPrice: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
      ])
      .optional(),
    costPrice: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
      ])
      .optional(),
    sku: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  });

export const ComboItemCreateWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemCreateWithoutVariantInput> =
  z.strictObject({
    quantity: z.number().int(),
    combo: z.lazy(() => ComboCreateNestedOneWithoutComboItemsInputSchema),
  });

export const ComboItemUncheckedCreateWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemUncheckedCreateWithoutVariantInput> =
  z.strictObject({
    id: z.number().int().optional(),
    comboId: z.number().int(),
    quantity: z.number().int(),
  });

export const ComboItemCreateOrConnectWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemCreateOrConnectWithoutVariantInput> =
  z.strictObject({
    where: z.lazy(() => ComboItemWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ComboItemCreateWithoutVariantInputSchema),
      z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema),
    ]),
  });

export const ComboItemCreateManyVariantInputEnvelopeSchema: z.ZodType<Prisma.ComboItemCreateManyVariantInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => ComboItemCreateManyVariantInputSchema),
      z.lazy(() => ComboItemCreateManyVariantInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const StockCreateWithoutVariantInputSchema: z.ZodType<Prisma.StockCreateWithoutVariantInput> =
  z.strictObject({
    quantity: z.number().int().optional(),
  });

export const StockUncheckedCreateWithoutVariantInputSchema: z.ZodType<Prisma.StockUncheckedCreateWithoutVariantInput> =
  z.strictObject({
    id: z.number().int().optional(),
    quantity: z.number().int().optional(),
  });

export const StockCreateOrConnectWithoutVariantInputSchema: z.ZodType<Prisma.StockCreateOrConnectWithoutVariantInput> =
  z.strictObject({
    where: z.lazy(() => StockWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => StockCreateWithoutVariantInputSchema),
      z.lazy(() => StockUncheckedCreateWithoutVariantInputSchema),
    ]),
  });

export const ProductCreateWithoutVariantsInputSchema: z.ZodType<Prisma.ProductCreateWithoutVariantsInput> =
  z.strictObject({
    name: z.string(),
    image: z.string().optional().nullable(),
    rating: z.number().int().optional(),
    sex: z.lazy(() => SexSchema),
    concentration: z.lazy(() => ConcentrationSchema),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const ProductUncheckedCreateWithoutVariantsInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutVariantsInput> =
  z.strictObject({
    id: z.number().int().optional(),
    name: z.string(),
    image: z.string().optional().nullable(),
    rating: z.number().int().optional(),
    sex: z.lazy(() => SexSchema),
    concentration: z.lazy(() => ConcentrationSchema),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const ProductCreateOrConnectWithoutVariantsInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutVariantsInput> =
  z.strictObject({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ProductCreateWithoutVariantsInputSchema),
      z.lazy(() => ProductUncheckedCreateWithoutVariantsInputSchema),
    ]),
  });

export const ComboItemUpsertWithWhereUniqueWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemUpsertWithWhereUniqueWithoutVariantInput> =
  z.strictObject({
    where: z.lazy(() => ComboItemWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => ComboItemUpdateWithoutVariantInputSchema),
      z.lazy(() => ComboItemUncheckedUpdateWithoutVariantInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ComboItemCreateWithoutVariantInputSchema),
      z.lazy(() => ComboItemUncheckedCreateWithoutVariantInputSchema),
    ]),
  });

export const ComboItemUpdateWithWhereUniqueWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemUpdateWithWhereUniqueWithoutVariantInput> =
  z.strictObject({
    where: z.lazy(() => ComboItemWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => ComboItemUpdateWithoutVariantInputSchema),
      z.lazy(() => ComboItemUncheckedUpdateWithoutVariantInputSchema),
    ]),
  });

export const ComboItemUpdateManyWithWhereWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemUpdateManyWithWhereWithoutVariantInput> =
  z.strictObject({
    where: z.lazy(() => ComboItemScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => ComboItemUpdateManyMutationInputSchema),
      z.lazy(() => ComboItemUncheckedUpdateManyWithoutVariantInputSchema),
    ]),
  });

export const ComboItemScalarWhereInputSchema: z.ZodType<Prisma.ComboItemScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ComboItemScalarWhereInputSchema),
        z.lazy(() => ComboItemScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ComboItemScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ComboItemScalarWhereInputSchema),
        z.lazy(() => ComboItemScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    variantId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    comboId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  });

export const StockUpsertWithoutVariantInputSchema: z.ZodType<Prisma.StockUpsertWithoutVariantInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => StockUpdateWithoutVariantInputSchema),
      z.lazy(() => StockUncheckedUpdateWithoutVariantInputSchema),
    ]),
    create: z.union([
      z.lazy(() => StockCreateWithoutVariantInputSchema),
      z.lazy(() => StockUncheckedCreateWithoutVariantInputSchema),
    ]),
    where: z.lazy(() => StockWhereInputSchema).optional(),
  });

export const StockUpdateToOneWithWhereWithoutVariantInputSchema: z.ZodType<Prisma.StockUpdateToOneWithWhereWithoutVariantInput> =
  z.strictObject({
    where: z.lazy(() => StockWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => StockUpdateWithoutVariantInputSchema),
      z.lazy(() => StockUncheckedUpdateWithoutVariantInputSchema),
    ]),
  });

export const StockUpdateWithoutVariantInputSchema: z.ZodType<Prisma.StockUpdateWithoutVariantInput> =
  z.strictObject({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const StockUncheckedUpdateWithoutVariantInputSchema: z.ZodType<Prisma.StockUncheckedUpdateWithoutVariantInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ProductUpsertWithoutVariantsInputSchema: z.ZodType<Prisma.ProductUpsertWithoutVariantsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => ProductUpdateWithoutVariantsInputSchema),
      z.lazy(() => ProductUncheckedUpdateWithoutVariantsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ProductCreateWithoutVariantsInputSchema),
      z.lazy(() => ProductUncheckedCreateWithoutVariantsInputSchema),
    ]),
    where: z.lazy(() => ProductWhereInputSchema).optional(),
  });

export const ProductUpdateToOneWithWhereWithoutVariantsInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutVariantsInput> =
  z.strictObject({
    where: z.lazy(() => ProductWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => ProductUpdateWithoutVariantsInputSchema),
      z.lazy(() => ProductUncheckedUpdateWithoutVariantsInputSchema),
    ]),
  });

export const ProductUpdateWithoutVariantsInputSchema: z.ZodType<Prisma.ProductUpdateWithoutVariantsInput> =
  z.strictObject({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rating: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sex: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => EnumSexFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    concentration: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => EnumConcentrationFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ProductUncheckedUpdateWithoutVariantsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutVariantsInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rating: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sex: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => EnumSexFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    concentration: z
      .union([
        z.lazy(() => ConcentrationSchema),
        z.lazy(() => EnumConcentrationFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VariantCreateWithoutStockInputSchema: z.ZodType<Prisma.VariantCreateWithoutStockInput> =
  z.strictObject({
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    comboItem: z
      .lazy(() => ComboItemCreateNestedManyWithoutVariantInputSchema)
      .optional(),
    product: z.lazy(() => ProductCreateNestedOneWithoutVariantsInputSchema),
  });

export const VariantUncheckedCreateWithoutStockInputSchema: z.ZodType<Prisma.VariantUncheckedCreateWithoutStockInput> =
  z.strictObject({
    id: z.number().int().optional(),
    productId: z.number().int(),
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    comboItem: z
      .lazy(() => ComboItemUncheckedCreateNestedManyWithoutVariantInputSchema)
      .optional(),
  });

export const VariantCreateOrConnectWithoutStockInputSchema: z.ZodType<Prisma.VariantCreateOrConnectWithoutStockInput> =
  z.strictObject({
    where: z.lazy(() => VariantWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VariantCreateWithoutStockInputSchema),
      z.lazy(() => VariantUncheckedCreateWithoutStockInputSchema),
    ]),
  });

export const VariantUpsertWithoutStockInputSchema: z.ZodType<Prisma.VariantUpsertWithoutStockInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => VariantUpdateWithoutStockInputSchema),
      z.lazy(() => VariantUncheckedUpdateWithoutStockInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VariantCreateWithoutStockInputSchema),
      z.lazy(() => VariantUncheckedCreateWithoutStockInputSchema),
    ]),
    where: z.lazy(() => VariantWhereInputSchema).optional(),
  });

export const VariantUpdateToOneWithWhereWithoutStockInputSchema: z.ZodType<Prisma.VariantUpdateToOneWithWhereWithoutStockInput> =
  z.strictObject({
    where: z.lazy(() => VariantWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => VariantUpdateWithoutStockInputSchema),
      z.lazy(() => VariantUncheckedUpdateWithoutStockInputSchema),
    ]),
  });

export const VariantUpdateWithoutStockInputSchema: z.ZodType<Prisma.VariantUpdateWithoutStockInput> =
  z.strictObject({
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboItem: z
      .lazy(() => ComboItemUpdateManyWithoutVariantNestedInputSchema)
      .optional(),
    product: z
      .lazy(() => ProductUpdateOneRequiredWithoutVariantsNestedInputSchema)
      .optional(),
  });

export const VariantUncheckedUpdateWithoutStockInputSchema: z.ZodType<Prisma.VariantUncheckedUpdateWithoutStockInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    productId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboItem: z
      .lazy(() => ComboItemUncheckedUpdateManyWithoutVariantNestedInputSchema)
      .optional(),
  });

export const ComboItemCreateWithoutComboInputSchema: z.ZodType<Prisma.ComboItemCreateWithoutComboInput> =
  z.strictObject({
    quantity: z.number().int(),
    variant: z.lazy(() => VariantCreateNestedOneWithoutComboItemInputSchema),
  });

export const ComboItemUncheckedCreateWithoutComboInputSchema: z.ZodType<Prisma.ComboItemUncheckedCreateWithoutComboInput> =
  z.strictObject({
    id: z.number().int().optional(),
    variantId: z.number().int(),
    quantity: z.number().int(),
  });

export const ComboItemCreateOrConnectWithoutComboInputSchema: z.ZodType<Prisma.ComboItemCreateOrConnectWithoutComboInput> =
  z.strictObject({
    where: z.lazy(() => ComboItemWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ComboItemCreateWithoutComboInputSchema),
      z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema),
    ]),
  });

export const ComboItemCreateManyComboInputEnvelopeSchema: z.ZodType<Prisma.ComboItemCreateManyComboInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => ComboItemCreateManyComboInputSchema),
      z.lazy(() => ComboItemCreateManyComboInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  });

export const ComboItemUpsertWithWhereUniqueWithoutComboInputSchema: z.ZodType<Prisma.ComboItemUpsertWithWhereUniqueWithoutComboInput> =
  z.strictObject({
    where: z.lazy(() => ComboItemWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => ComboItemUpdateWithoutComboInputSchema),
      z.lazy(() => ComboItemUncheckedUpdateWithoutComboInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ComboItemCreateWithoutComboInputSchema),
      z.lazy(() => ComboItemUncheckedCreateWithoutComboInputSchema),
    ]),
  });

export const ComboItemUpdateWithWhereUniqueWithoutComboInputSchema: z.ZodType<Prisma.ComboItemUpdateWithWhereUniqueWithoutComboInput> =
  z.strictObject({
    where: z.lazy(() => ComboItemWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => ComboItemUpdateWithoutComboInputSchema),
      z.lazy(() => ComboItemUncheckedUpdateWithoutComboInputSchema),
    ]),
  });

export const ComboItemUpdateManyWithWhereWithoutComboInputSchema: z.ZodType<Prisma.ComboItemUpdateManyWithWhereWithoutComboInput> =
  z.strictObject({
    where: z.lazy(() => ComboItemScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => ComboItemUpdateManyMutationInputSchema),
      z.lazy(() => ComboItemUncheckedUpdateManyWithoutComboInputSchema),
    ]),
  });

export const ComboCreateWithoutComboItemsInputSchema: z.ZodType<Prisma.ComboCreateWithoutComboItemsInput> =
  z.strictObject({
    name: z.string(),
    image: z.string().optional().nullable(),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    stockQuantity: z.number().int().optional(),
    isActive: z.boolean(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const ComboUncheckedCreateWithoutComboItemsInputSchema: z.ZodType<Prisma.ComboUncheckedCreateWithoutComboItemsInput> =
  z.strictObject({
    id: z.number().int().optional(),
    name: z.string(),
    image: z.string().optional().nullable(),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    stockQuantity: z.number().int().optional(),
    isActive: z.boolean(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const ComboCreateOrConnectWithoutComboItemsInputSchema: z.ZodType<Prisma.ComboCreateOrConnectWithoutComboItemsInput> =
  z.strictObject({
    where: z.lazy(() => ComboWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ComboCreateWithoutComboItemsInputSchema),
      z.lazy(() => ComboUncheckedCreateWithoutComboItemsInputSchema),
    ]),
  });

export const VariantCreateWithoutComboItemInputSchema: z.ZodType<Prisma.VariantCreateWithoutComboItemInput> =
  z.strictObject({
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    stock: z
      .lazy(() => StockCreateNestedOneWithoutVariantInputSchema)
      .optional(),
    product: z.lazy(() => ProductCreateNestedOneWithoutVariantsInputSchema),
  });

export const VariantUncheckedCreateWithoutComboItemInputSchema: z.ZodType<Prisma.VariantUncheckedCreateWithoutComboItemInput> =
  z.strictObject({
    id: z.number().int().optional(),
    productId: z.number().int(),
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    stock: z
      .lazy(() => StockUncheckedCreateNestedOneWithoutVariantInputSchema)
      .optional(),
  });

export const VariantCreateOrConnectWithoutComboItemInputSchema: z.ZodType<Prisma.VariantCreateOrConnectWithoutComboItemInput> =
  z.strictObject({
    where: z.lazy(() => VariantWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => VariantCreateWithoutComboItemInputSchema),
      z.lazy(() => VariantUncheckedCreateWithoutComboItemInputSchema),
    ]),
  });

export const ComboUpsertWithoutComboItemsInputSchema: z.ZodType<Prisma.ComboUpsertWithoutComboItemsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => ComboUpdateWithoutComboItemsInputSchema),
      z.lazy(() => ComboUncheckedUpdateWithoutComboItemsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ComboCreateWithoutComboItemsInputSchema),
      z.lazy(() => ComboUncheckedCreateWithoutComboItemsInputSchema),
    ]),
    where: z.lazy(() => ComboWhereInputSchema).optional(),
  });

export const ComboUpdateToOneWithWhereWithoutComboItemsInputSchema: z.ZodType<Prisma.ComboUpdateToOneWithWhereWithoutComboItemsInput> =
  z.strictObject({
    where: z.lazy(() => ComboWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => ComboUpdateWithoutComboItemsInputSchema),
      z.lazy(() => ComboUncheckedUpdateWithoutComboItemsInputSchema),
    ]),
  });

export const ComboUpdateWithoutComboItemsInputSchema: z.ZodType<Prisma.ComboUpdateWithoutComboItemsInput> =
  z.strictObject({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stockQuantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboUncheckedUpdateWithoutComboItemsInputSchema: z.ZodType<Prisma.ComboUncheckedUpdateWithoutComboItemsInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stockQuantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VariantUpsertWithoutComboItemInputSchema: z.ZodType<Prisma.VariantUpsertWithoutComboItemInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => VariantUpdateWithoutComboItemInputSchema),
      z.lazy(() => VariantUncheckedUpdateWithoutComboItemInputSchema),
    ]),
    create: z.union([
      z.lazy(() => VariantCreateWithoutComboItemInputSchema),
      z.lazy(() => VariantUncheckedCreateWithoutComboItemInputSchema),
    ]),
    where: z.lazy(() => VariantWhereInputSchema).optional(),
  });

export const VariantUpdateToOneWithWhereWithoutComboItemInputSchema: z.ZodType<Prisma.VariantUpdateToOneWithWhereWithoutComboItemInput> =
  z.strictObject({
    where: z.lazy(() => VariantWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => VariantUpdateWithoutComboItemInputSchema),
      z.lazy(() => VariantUncheckedUpdateWithoutComboItemInputSchema),
    ]),
  });

export const VariantUpdateWithoutComboItemInputSchema: z.ZodType<Prisma.VariantUpdateWithoutComboItemInput> =
  z.strictObject({
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stock: z
      .lazy(() => StockUpdateOneWithoutVariantNestedInputSchema)
      .optional(),
    product: z
      .lazy(() => ProductUpdateOneRequiredWithoutVariantsNestedInputSchema)
      .optional(),
  });

export const VariantUncheckedUpdateWithoutComboItemInputSchema: z.ZodType<Prisma.VariantUncheckedUpdateWithoutComboItemInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    productId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stock: z
      .lazy(() => StockUncheckedUpdateOneWithoutVariantNestedInputSchema)
      .optional(),
  });

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  });

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  });

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  });

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  });

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const VariantCreateManyProductInputSchema: z.ZodType<Prisma.VariantCreateManyProductInput> =
  z.strictObject({
    id: z.number().int().optional(),
    sizeMl: z.lazy(() => SizeMlSchema),
    sellingPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    costPrice: z
      .union([
        z.number(),
        z.string(),
        z.instanceof(PrismaDecimal),
        DecimalJsLikeSchema,
      ])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    sku: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

export const VariantUpdateWithoutProductInputSchema: z.ZodType<Prisma.VariantUpdateWithoutProductInput> =
  z.strictObject({
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboItem: z
      .lazy(() => ComboItemUpdateManyWithoutVariantNestedInputSchema)
      .optional(),
    stock: z
      .lazy(() => StockUpdateOneWithoutVariantNestedInputSchema)
      .optional(),
  });

export const VariantUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.VariantUncheckedUpdateWithoutProductInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboItem: z
      .lazy(() => ComboItemUncheckedUpdateManyWithoutVariantNestedInputSchema)
      .optional(),
    stock: z
      .lazy(() => StockUncheckedUpdateOneWithoutVariantNestedInputSchema)
      .optional(),
  });

export const VariantUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.VariantUncheckedUpdateManyWithoutProductInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sizeMl: z
      .union([
        z.lazy(() => SizeMlSchema),
        z.lazy(() => EnumSizeMlFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sellingPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    costPrice: z
      .union([
        z
          .union([
            z.number(),
            z.string(),
            z.instanceof(PrismaDecimal),
            DecimalJsLikeSchema,
          ])
          .refine((v) => isValidDecimalInput(v), {
            message: 'Must be a Decimal',
          }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sku: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboItemCreateManyVariantInputSchema: z.ZodType<Prisma.ComboItemCreateManyVariantInput> =
  z.strictObject({
    id: z.number().int().optional(),
    comboId: z.number().int(),
    quantity: z.number().int(),
  });

export const ComboItemUpdateWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemUpdateWithoutVariantInput> =
  z.strictObject({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    combo: z
      .lazy(() => ComboUpdateOneRequiredWithoutComboItemsNestedInputSchema)
      .optional(),
  });

export const ComboItemUncheckedUpdateWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemUncheckedUpdateWithoutVariantInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboItemUncheckedUpdateManyWithoutVariantInputSchema: z.ZodType<Prisma.ComboItemUncheckedUpdateManyWithoutVariantInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    comboId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboItemCreateManyComboInputSchema: z.ZodType<Prisma.ComboItemCreateManyComboInput> =
  z.strictObject({
    id: z.number().int().optional(),
    variantId: z.number().int(),
    quantity: z.number().int(),
  });

export const ComboItemUpdateWithoutComboInputSchema: z.ZodType<Prisma.ComboItemUpdateWithoutComboInput> =
  z.strictObject({
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variant: z
      .lazy(() => VariantUpdateOneRequiredWithoutComboItemNestedInputSchema)
      .optional(),
  });

export const ComboItemUncheckedUpdateWithoutComboInputSchema: z.ZodType<Prisma.ComboItemUncheckedUpdateWithoutComboInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variantId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

export const ComboItemUncheckedUpdateManyWithoutComboInputSchema: z.ZodType<Prisma.ComboItemUncheckedUpdateManyWithoutComboInput> =
  z.strictObject({
    id: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    variantId: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  });

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z
      .union([
        SessionOrderByWithAggregationInputSchema.array(),
        SessionOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SessionScalarFieldEnumSchema.array(),
    having: SessionScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict();

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputSchema.array(),
        AccountOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AccountScalarFieldEnumSchema.array(),
    having: AccountScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithRelationInputSchema.array(),
          VerificationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationScalarFieldEnumSchema,
          VerificationScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithRelationInputSchema.array(),
          VerificationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationScalarFieldEnumSchema,
          VerificationScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithRelationInputSchema.array(),
          VerificationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationScalarFieldEnumSchema,
          VerificationScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> =
  z
    .object({
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithRelationInputSchema.array(),
          VerificationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> =
  z
    .object({
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithAggregationInputSchema.array(),
          VerificationOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: VerificationScalarFieldEnumSchema.array(),
      having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereUniqueInputSchema,
    })
    .strict();

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereUniqueInputSchema,
    })
    .strict();

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProductOrderByWithRelationInputSchema.array(),
          ProductOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProductWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProductScalarFieldEnumSchema,
          ProductScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProductOrderByWithRelationInputSchema.array(),
          ProductOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProductWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProductScalarFieldEnumSchema,
          ProductScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProductOrderByWithRelationInputSchema.array(),
          ProductOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProductWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProductScalarFieldEnumSchema,
          ProductScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> =
  z
    .object({
      where: ProductWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProductOrderByWithRelationInputSchema.array(),
          ProductOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProductWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z
  .object({
    where: ProductWhereInputSchema.optional(),
    orderBy: z
      .union([
        ProductOrderByWithAggregationInputSchema.array(),
        ProductOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ProductScalarFieldEnumSchema.array(),
    having: ProductScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereUniqueInputSchema,
    })
    .strict();

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereUniqueInputSchema,
    })
    .strict();

export const VariantFindFirstArgsSchema: z.ZodType<Prisma.VariantFindFirstArgs> =
  z
    .object({
      select: VariantSelectSchema.optional(),
      include: VariantIncludeSchema.optional(),
      where: VariantWhereInputSchema.optional(),
      orderBy: z
        .union([
          VariantOrderByWithRelationInputSchema.array(),
          VariantOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VariantWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VariantScalarFieldEnumSchema,
          VariantScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VariantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VariantFindFirstOrThrowArgs> =
  z
    .object({
      select: VariantSelectSchema.optional(),
      include: VariantIncludeSchema.optional(),
      where: VariantWhereInputSchema.optional(),
      orderBy: z
        .union([
          VariantOrderByWithRelationInputSchema.array(),
          VariantOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VariantWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VariantScalarFieldEnumSchema,
          VariantScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VariantFindManyArgsSchema: z.ZodType<Prisma.VariantFindManyArgs> =
  z
    .object({
      select: VariantSelectSchema.optional(),
      include: VariantIncludeSchema.optional(),
      where: VariantWhereInputSchema.optional(),
      orderBy: z
        .union([
          VariantOrderByWithRelationInputSchema.array(),
          VariantOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VariantWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VariantScalarFieldEnumSchema,
          VariantScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VariantAggregateArgsSchema: z.ZodType<Prisma.VariantAggregateArgs> =
  z
    .object({
      where: VariantWhereInputSchema.optional(),
      orderBy: z
        .union([
          VariantOrderByWithRelationInputSchema.array(),
          VariantOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VariantWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VariantGroupByArgsSchema: z.ZodType<Prisma.VariantGroupByArgs> = z
  .object({
    where: VariantWhereInputSchema.optional(),
    orderBy: z
      .union([
        VariantOrderByWithAggregationInputSchema.array(),
        VariantOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: VariantScalarFieldEnumSchema.array(),
    having: VariantScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const VariantFindUniqueArgsSchema: z.ZodType<Prisma.VariantFindUniqueArgs> =
  z
    .object({
      select: VariantSelectSchema.optional(),
      include: VariantIncludeSchema.optional(),
      where: VariantWhereUniqueInputSchema,
    })
    .strict();

export const VariantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VariantFindUniqueOrThrowArgs> =
  z
    .object({
      select: VariantSelectSchema.optional(),
      include: VariantIncludeSchema.optional(),
      where: VariantWhereUniqueInputSchema,
    })
    .strict();

export const StockFindFirstArgsSchema: z.ZodType<Prisma.StockFindFirstArgs> = z
  .object({
    select: StockSelectSchema.optional(),
    include: StockIncludeSchema.optional(),
    where: StockWhereInputSchema.optional(),
    orderBy: z
      .union([
        StockOrderByWithRelationInputSchema.array(),
        StockOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: StockWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([StockScalarFieldEnumSchema, StockScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const StockFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StockFindFirstOrThrowArgs> =
  z
    .object({
      select: StockSelectSchema.optional(),
      include: StockIncludeSchema.optional(),
      where: StockWhereInputSchema.optional(),
      orderBy: z
        .union([
          StockOrderByWithRelationInputSchema.array(),
          StockOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: StockWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([StockScalarFieldEnumSchema, StockScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const StockFindManyArgsSchema: z.ZodType<Prisma.StockFindManyArgs> = z
  .object({
    select: StockSelectSchema.optional(),
    include: StockIncludeSchema.optional(),
    where: StockWhereInputSchema.optional(),
    orderBy: z
      .union([
        StockOrderByWithRelationInputSchema.array(),
        StockOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: StockWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([StockScalarFieldEnumSchema, StockScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const StockAggregateArgsSchema: z.ZodType<Prisma.StockAggregateArgs> = z
  .object({
    where: StockWhereInputSchema.optional(),
    orderBy: z
      .union([
        StockOrderByWithRelationInputSchema.array(),
        StockOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: StockWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const StockGroupByArgsSchema: z.ZodType<Prisma.StockGroupByArgs> = z
  .object({
    where: StockWhereInputSchema.optional(),
    orderBy: z
      .union([
        StockOrderByWithAggregationInputSchema.array(),
        StockOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: StockScalarFieldEnumSchema.array(),
    having: StockScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const StockFindUniqueArgsSchema: z.ZodType<Prisma.StockFindUniqueArgs> =
  z
    .object({
      select: StockSelectSchema.optional(),
      include: StockIncludeSchema.optional(),
      where: StockWhereUniqueInputSchema,
    })
    .strict();

export const StockFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StockFindUniqueOrThrowArgs> =
  z
    .object({
      select: StockSelectSchema.optional(),
      include: StockIncludeSchema.optional(),
      where: StockWhereUniqueInputSchema,
    })
    .strict();

export const ComboFindFirstArgsSchema: z.ZodType<Prisma.ComboFindFirstArgs> = z
  .object({
    select: ComboSelectSchema.optional(),
    include: ComboIncludeSchema.optional(),
    where: ComboWhereInputSchema.optional(),
    orderBy: z
      .union([
        ComboOrderByWithRelationInputSchema.array(),
        ComboOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ComboWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ComboScalarFieldEnumSchema, ComboScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const ComboFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ComboFindFirstOrThrowArgs> =
  z
    .object({
      select: ComboSelectSchema.optional(),
      include: ComboIncludeSchema.optional(),
      where: ComboWhereInputSchema.optional(),
      orderBy: z
        .union([
          ComboOrderByWithRelationInputSchema.array(),
          ComboOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ComboWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([ComboScalarFieldEnumSchema, ComboScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const ComboFindManyArgsSchema: z.ZodType<Prisma.ComboFindManyArgs> = z
  .object({
    select: ComboSelectSchema.optional(),
    include: ComboIncludeSchema.optional(),
    where: ComboWhereInputSchema.optional(),
    orderBy: z
      .union([
        ComboOrderByWithRelationInputSchema.array(),
        ComboOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ComboWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ComboScalarFieldEnumSchema, ComboScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const ComboAggregateArgsSchema: z.ZodType<Prisma.ComboAggregateArgs> = z
  .object({
    where: ComboWhereInputSchema.optional(),
    orderBy: z
      .union([
        ComboOrderByWithRelationInputSchema.array(),
        ComboOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ComboWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ComboGroupByArgsSchema: z.ZodType<Prisma.ComboGroupByArgs> = z
  .object({
    where: ComboWhereInputSchema.optional(),
    orderBy: z
      .union([
        ComboOrderByWithAggregationInputSchema.array(),
        ComboOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ComboScalarFieldEnumSchema.array(),
    having: ComboScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ComboFindUniqueArgsSchema: z.ZodType<Prisma.ComboFindUniqueArgs> =
  z
    .object({
      select: ComboSelectSchema.optional(),
      include: ComboIncludeSchema.optional(),
      where: ComboWhereUniqueInputSchema,
    })
    .strict();

export const ComboFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ComboFindUniqueOrThrowArgs> =
  z
    .object({
      select: ComboSelectSchema.optional(),
      include: ComboIncludeSchema.optional(),
      where: ComboWhereUniqueInputSchema,
    })
    .strict();

export const ComboItemFindFirstArgsSchema: z.ZodType<Prisma.ComboItemFindFirstArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      where: ComboItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ComboItemOrderByWithRelationInputSchema.array(),
          ComboItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ComboItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ComboItemScalarFieldEnumSchema,
          ComboItemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ComboItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ComboItemFindFirstOrThrowArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      where: ComboItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ComboItemOrderByWithRelationInputSchema.array(),
          ComboItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ComboItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ComboItemScalarFieldEnumSchema,
          ComboItemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ComboItemFindManyArgsSchema: z.ZodType<Prisma.ComboItemFindManyArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      where: ComboItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ComboItemOrderByWithRelationInputSchema.array(),
          ComboItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ComboItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ComboItemScalarFieldEnumSchema,
          ComboItemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ComboItemAggregateArgsSchema: z.ZodType<Prisma.ComboItemAggregateArgs> =
  z
    .object({
      where: ComboItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ComboItemOrderByWithRelationInputSchema.array(),
          ComboItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ComboItemWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ComboItemGroupByArgsSchema: z.ZodType<Prisma.ComboItemGroupByArgs> =
  z
    .object({
      where: ComboItemWhereInputSchema.optional(),
      orderBy: z
        .union([
          ComboItemOrderByWithAggregationInputSchema.array(),
          ComboItemOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ComboItemScalarFieldEnumSchema.array(),
      having: ComboItemScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ComboItemFindUniqueArgsSchema: z.ZodType<Prisma.ComboItemFindUniqueArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      where: ComboItemWhereUniqueInputSchema,
    })
    .strict();

export const ComboItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ComboItemFindUniqueOrThrowArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      where: ComboItemWhereUniqueInputSchema,
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserCreateManyInputSchema,
        UserCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserUpdateManyMutationInputSchema,
        UserUncheckedUpdateManyInputSchema,
      ]),
      where: UserWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
    create: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SessionUpdateManyMutationInputSchema,
        SessionUncheckedUpdateManyInputSchema,
      ]),
      where: SessionWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        SessionUpdateManyMutationInputSchema,
        SessionUncheckedUpdateManyInputSchema,
      ]),
      where: SessionWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
    create: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
    update: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      data: z.union([
        VerificationCreateInputSchema,
        VerificationUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereUniqueInputSchema,
      create: z.union([
        VerificationCreateInputSchema,
        VerificationUncheckedCreateInputSchema,
      ]),
      update: z.union([
        VerificationUpdateInputSchema,
        VerificationUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationCreateManyInputSchema,
        VerificationCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VerificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VerificationCreateManyInputSchema,
        VerificationCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereUniqueInputSchema,
    })
    .strict();

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      data: z.union([
        VerificationUpdateInputSchema,
        VerificationUncheckedUpdateInputSchema,
      ]),
      where: VerificationWhereUniqueInputSchema,
    })
    .strict();

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationUpdateManyMutationInputSchema,
        VerificationUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VerificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VerificationUpdateManyMutationInputSchema,
        VerificationUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> =
  z
    .object({
      where: VerificationWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    data: z.union([
      ProductCreateInputSchema,
      ProductUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereUniqueInputSchema,
    create: z.union([
      ProductCreateInputSchema,
      ProductUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ProductUpdateInputSchema,
      ProductUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> =
  z
    .object({
      data: z.union([
        ProductCreateManyInputSchema,
        ProductCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ProductCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ProductCreateManyInputSchema,
        ProductCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereUniqueInputSchema,
  })
  .strict();

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    data: z.union([
      ProductUpdateInputSchema,
      ProductUncheckedUpdateInputSchema,
    ]),
    where: ProductWhereUniqueInputSchema,
  })
  .strict();

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ProductUpdateManyMutationInputSchema,
        ProductUncheckedUpdateManyInputSchema,
      ]),
      where: ProductWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ProductUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ProductUpdateManyMutationInputSchema,
        ProductUncheckedUpdateManyInputSchema,
      ]),
      where: ProductWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> =
  z
    .object({
      where: ProductWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VariantCreateArgsSchema: z.ZodType<Prisma.VariantCreateArgs> = z
  .object({
    select: VariantSelectSchema.optional(),
    include: VariantIncludeSchema.optional(),
    data: z.union([
      VariantCreateInputSchema,
      VariantUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const VariantUpsertArgsSchema: z.ZodType<Prisma.VariantUpsertArgs> = z
  .object({
    select: VariantSelectSchema.optional(),
    include: VariantIncludeSchema.optional(),
    where: VariantWhereUniqueInputSchema,
    create: z.union([
      VariantCreateInputSchema,
      VariantUncheckedCreateInputSchema,
    ]),
    update: z.union([
      VariantUpdateInputSchema,
      VariantUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const VariantCreateManyArgsSchema: z.ZodType<Prisma.VariantCreateManyArgs> =
  z
    .object({
      data: z.union([
        VariantCreateManyInputSchema,
        VariantCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VariantCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VariantCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VariantCreateManyInputSchema,
        VariantCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VariantDeleteArgsSchema: z.ZodType<Prisma.VariantDeleteArgs> = z
  .object({
    select: VariantSelectSchema.optional(),
    include: VariantIncludeSchema.optional(),
    where: VariantWhereUniqueInputSchema,
  })
  .strict();

export const VariantUpdateArgsSchema: z.ZodType<Prisma.VariantUpdateArgs> = z
  .object({
    select: VariantSelectSchema.optional(),
    include: VariantIncludeSchema.optional(),
    data: z.union([
      VariantUpdateInputSchema,
      VariantUncheckedUpdateInputSchema,
    ]),
    where: VariantWhereUniqueInputSchema,
  })
  .strict();

export const VariantUpdateManyArgsSchema: z.ZodType<Prisma.VariantUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VariantUpdateManyMutationInputSchema,
        VariantUncheckedUpdateManyInputSchema,
      ]),
      where: VariantWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VariantUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VariantUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VariantUpdateManyMutationInputSchema,
        VariantUncheckedUpdateManyInputSchema,
      ]),
      where: VariantWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const VariantDeleteManyArgsSchema: z.ZodType<Prisma.VariantDeleteManyArgs> =
  z
    .object({
      where: VariantWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const StockCreateArgsSchema: z.ZodType<Prisma.StockCreateArgs> = z
  .object({
    select: StockSelectSchema.optional(),
    include: StockIncludeSchema.optional(),
    data: z.union([StockCreateInputSchema, StockUncheckedCreateInputSchema]),
  })
  .strict();

export const StockUpsertArgsSchema: z.ZodType<Prisma.StockUpsertArgs> = z
  .object({
    select: StockSelectSchema.optional(),
    include: StockIncludeSchema.optional(),
    where: StockWhereUniqueInputSchema,
    create: z.union([StockCreateInputSchema, StockUncheckedCreateInputSchema]),
    update: z.union([StockUpdateInputSchema, StockUncheckedUpdateInputSchema]),
  })
  .strict();

export const StockCreateManyArgsSchema: z.ZodType<Prisma.StockCreateManyArgs> =
  z
    .object({
      data: z.union([
        StockCreateManyInputSchema,
        StockCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StockCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StockCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        StockCreateManyInputSchema,
        StockCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StockDeleteArgsSchema: z.ZodType<Prisma.StockDeleteArgs> = z
  .object({
    select: StockSelectSchema.optional(),
    include: StockIncludeSchema.optional(),
    where: StockWhereUniqueInputSchema,
  })
  .strict();

export const StockUpdateArgsSchema: z.ZodType<Prisma.StockUpdateArgs> = z
  .object({
    select: StockSelectSchema.optional(),
    include: StockIncludeSchema.optional(),
    data: z.union([StockUpdateInputSchema, StockUncheckedUpdateInputSchema]),
    where: StockWhereUniqueInputSchema,
  })
  .strict();

export const StockUpdateManyArgsSchema: z.ZodType<Prisma.StockUpdateManyArgs> =
  z
    .object({
      data: z.union([
        StockUpdateManyMutationInputSchema,
        StockUncheckedUpdateManyInputSchema,
      ]),
      where: StockWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const StockUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StockUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        StockUpdateManyMutationInputSchema,
        StockUncheckedUpdateManyInputSchema,
      ]),
      where: StockWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const StockDeleteManyArgsSchema: z.ZodType<Prisma.StockDeleteManyArgs> =
  z
    .object({
      where: StockWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ComboCreateArgsSchema: z.ZodType<Prisma.ComboCreateArgs> = z
  .object({
    select: ComboSelectSchema.optional(),
    include: ComboIncludeSchema.optional(),
    data: z.union([ComboCreateInputSchema, ComboUncheckedCreateInputSchema]),
  })
  .strict();

export const ComboUpsertArgsSchema: z.ZodType<Prisma.ComboUpsertArgs> = z
  .object({
    select: ComboSelectSchema.optional(),
    include: ComboIncludeSchema.optional(),
    where: ComboWhereUniqueInputSchema,
    create: z.union([ComboCreateInputSchema, ComboUncheckedCreateInputSchema]),
    update: z.union([ComboUpdateInputSchema, ComboUncheckedUpdateInputSchema]),
  })
  .strict();

export const ComboCreateManyArgsSchema: z.ZodType<Prisma.ComboCreateManyArgs> =
  z
    .object({
      data: z.union([
        ComboCreateManyInputSchema,
        ComboCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ComboCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ComboCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ComboCreateManyInputSchema,
        ComboCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ComboDeleteArgsSchema: z.ZodType<Prisma.ComboDeleteArgs> = z
  .object({
    select: ComboSelectSchema.optional(),
    include: ComboIncludeSchema.optional(),
    where: ComboWhereUniqueInputSchema,
  })
  .strict();

export const ComboUpdateArgsSchema: z.ZodType<Prisma.ComboUpdateArgs> = z
  .object({
    select: ComboSelectSchema.optional(),
    include: ComboIncludeSchema.optional(),
    data: z.union([ComboUpdateInputSchema, ComboUncheckedUpdateInputSchema]),
    where: ComboWhereUniqueInputSchema,
  })
  .strict();

export const ComboUpdateManyArgsSchema: z.ZodType<Prisma.ComboUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ComboUpdateManyMutationInputSchema,
        ComboUncheckedUpdateManyInputSchema,
      ]),
      where: ComboWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ComboUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ComboUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ComboUpdateManyMutationInputSchema,
        ComboUncheckedUpdateManyInputSchema,
      ]),
      where: ComboWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ComboDeleteManyArgsSchema: z.ZodType<Prisma.ComboDeleteManyArgs> =
  z
    .object({
      where: ComboWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ComboItemCreateArgsSchema: z.ZodType<Prisma.ComboItemCreateArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      data: z.union([
        ComboItemCreateInputSchema,
        ComboItemUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const ComboItemUpsertArgsSchema: z.ZodType<Prisma.ComboItemUpsertArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      where: ComboItemWhereUniqueInputSchema,
      create: z.union([
        ComboItemCreateInputSchema,
        ComboItemUncheckedCreateInputSchema,
      ]),
      update: z.union([
        ComboItemUpdateInputSchema,
        ComboItemUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const ComboItemCreateManyArgsSchema: z.ZodType<Prisma.ComboItemCreateManyArgs> =
  z
    .object({
      data: z.union([
        ComboItemCreateManyInputSchema,
        ComboItemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ComboItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ComboItemCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ComboItemCreateManyInputSchema,
        ComboItemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ComboItemDeleteArgsSchema: z.ZodType<Prisma.ComboItemDeleteArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      where: ComboItemWhereUniqueInputSchema,
    })
    .strict();

export const ComboItemUpdateArgsSchema: z.ZodType<Prisma.ComboItemUpdateArgs> =
  z
    .object({
      select: ComboItemSelectSchema.optional(),
      include: ComboItemIncludeSchema.optional(),
      data: z.union([
        ComboItemUpdateInputSchema,
        ComboItemUncheckedUpdateInputSchema,
      ]),
      where: ComboItemWhereUniqueInputSchema,
    })
    .strict();

export const ComboItemUpdateManyArgsSchema: z.ZodType<Prisma.ComboItemUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ComboItemUpdateManyMutationInputSchema,
        ComboItemUncheckedUpdateManyInputSchema,
      ]),
      where: ComboItemWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ComboItemUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ComboItemUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ComboItemUpdateManyMutationInputSchema,
        ComboItemUncheckedUpdateManyInputSchema,
      ]),
      where: ComboItemWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export const ComboItemDeleteManyArgsSchema: z.ZodType<Prisma.ComboItemDeleteManyArgs> =
  z
    .object({
      where: ComboItemWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();
