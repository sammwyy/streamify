export function useBodyDto (dto) {
    return (req, res, next) => {
        const result = dto.validate(req.body);
        if (result.error != null) {
            res.status(400).json({
                success: false,
                message: result.error.details[0].message
            })
        } else {
            next();
        }
    }
}